import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';

import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../errors/ApiError';
import { jwtHelpers } from '../helpers/jwtHelper';
const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    try {
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized');
      }
      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'Forbidden!! You are not authorized',
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
