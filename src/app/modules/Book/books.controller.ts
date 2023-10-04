import { Request, Response } from 'express';
import { BookService } from './books.service';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponses';
import httpStatus from 'http-status';

const createBook = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await BookService.createBook(data);
    res.status(200).json({
      status: 200,
      message: 'Book Created Successfully',
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
const getBooks = catchAsync(async (req: Request, res: Response) => {
  const {
    page = 1,
    size = 10,
    sortBy = 'price',
    sortOrder = 'asc',
    searchTerm = '',
    minPrice = 0,
    maxPrice = 50000,
    ...filtersData
  } = req.query;
  const result = await BookService.getBooks(
    Number(page),
    Number(size),
    sortBy as string,
    sortOrder as 'asc' | 'desc',
    searchTerm as string,
    Number(minPrice),
    Number(maxPrice),
    filtersData as Record<string, unknown>,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    data: result,
  });
});
const getBookByCategory = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, size = 10 } = req.query;
  const { categoryId } = req.params;
  const result = await BookService.getBookByCategory(
    categoryId,
    Number(page),
    Number(size),
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { ...data } = req.body;
  const result = await BookService.updateBook(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.deleteBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is deleted successfully',
    data: result,
  });
});

export const booksController = {
  createBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  getBookByCategory,
};
