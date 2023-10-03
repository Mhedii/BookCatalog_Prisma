import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../shared/sendResponses';
import httpStatus from 'http-status';
import { authService } from './auth.service';

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...loginData } = req.body;
    const result = await authService.loginUser(loginData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User signin successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = { loginUser };
