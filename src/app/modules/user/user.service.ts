import { PrismaClient, User } from '@prisma/client';
import { ILogin, ILoginResponse } from './user.interface';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { hashedPassword, isPasswordMatched } from './user.util';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtHelpers } from '../../../helpers/jwtHelper';

const prisma = new PrismaClient();

const createUser = async (user: User): Promise<User> => {
  user.password = await hashedPassword(user.password);

  const createdUser = await prisma.user.create({
    data: user
  });
  return createdUser;
};

const findByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  return user;
};

const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email, password } = payload;
  const isUserExist = await findByEmail(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.password && !(await isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken
  };
};

export const UserService = {
  createUser,
  loginUser
};
