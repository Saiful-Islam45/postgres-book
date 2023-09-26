import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/response';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { ILoginResponse } from './user.interface';
import config from '../../../config';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully!!',
    data: user
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: users
  });
});

const findUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await UserService.findUserById(id);
  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User getched successfully!!',
    data: user
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await UserService.updateUser(id, req.body);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated Successfully!!',
    data: user
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await UserService.deleteUser(id);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted Successfully!!',
    data: user
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.loginUser(req.body);
  const { refreshToken } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    token: result.accessToken
  });
});

export const Usercontroller = {
  createUser,
  loginUser,
  getAllUsers,
  findUserById,
  updateUser,
  deleteUser
};
