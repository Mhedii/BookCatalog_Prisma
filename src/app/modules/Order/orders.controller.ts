import { orderService } from './orders.service';
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponses';
import httpStatus from 'http-status';

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
const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const token = req.headers.authorization;
  if (!token) {
    return;
  }
  const result = await orderService.getOrderById(orderId, token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
};
export const orderController = {
  createOrder,
  getOrders,
  getOrderById,
};
