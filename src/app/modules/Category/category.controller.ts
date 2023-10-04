import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponses';
import catchAsync from '../../shared/catchAsync';
import { Request, Response } from 'express';
import { categoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const token = req.headers.authorization;
    if (!token) {
      return;
    }
    const result = await categoryService.createCategory(data, token);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});
export const categoryController = { createCategory, getCategories };
