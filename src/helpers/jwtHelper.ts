import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { ITokenData } from '../interfaces/common';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};


const verifyToken = (token: string, secret: Secret): ITokenData => {
  return jwt.verify(token, secret) as ITokenData;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};