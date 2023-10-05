import { Request, Response } from 'express';
import sendResponse from '../../shared/sendResponses';
import httpStatus from 'http-status';
import { profileService } from './profile.service';

export const getProfile = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return;
  }

  const result = await profileService.getProfile(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrived successfully',
    data: result,
  });
};
export const profileController = { getProfile };
