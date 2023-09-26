import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/apiError';
import { jwtHelpers } from '../../helpers/jwtHelper';
import { IAuthUser } from '../../interfaces/auth';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import { ITokenData } from '../../interfaces/common';

const auth =
  (...requiredRoles: string[]) =>
    async (req: any, res: Response, next: NextFunction) => {
      return new Promise(async (resolve, reject) => {
        const token = req.headers.authorization;

        if (!token) {
          return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
        }

        const verifiedUser: ITokenData = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

        if (!verifiedUser) {
          return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'));
        }

        req.user = verifiedUser;

        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
          return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
        }

        resolve(verifiedUser);
      })
        .then(() => next())
        .catch((err) => next(err));
    };

export default auth;
