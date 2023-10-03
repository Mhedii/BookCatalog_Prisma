import { Request, Response } from 'express';
import { UserService } from './users.service';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponses';
import httpStatus from 'http-status';

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await UserService.createUser(data);
    res.status(200).json({
      status: 200,
      message: 'user Created Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: error,
      message: 'Something went wrong',
      error,
    });
  }
};
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User getched successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { ...data } = req.body;
  const result = await UserService.updateUser(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.deleteUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const usersController = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
