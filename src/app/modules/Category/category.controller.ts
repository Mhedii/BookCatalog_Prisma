import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponses';
import catchAsync from '../../shared/catchAsync';
import { Request, Response } from 'express';
import { categoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await categoryService.createCategory(data);
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
export const categoryController = { createCategory };
