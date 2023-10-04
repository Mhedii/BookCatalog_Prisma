import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponses';
import httpStatus from 'http-status';
import { orderService } from './orders.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const token = req.headers.authorization;

    if (!token) {
      return;
    }
    const result = await orderService.createOrder(data, token);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return;
  }
  const result = await orderService.getOrders(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});
// const getSpecificOrder = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await orderService.getSpecificOrder(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order retrived successfully',
//     data: result,
//   });
// });

export const orderController = {
  createOrder,
  getOrders,
  //   getSpecificOrder,
};
