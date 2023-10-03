import { Response } from 'express';
type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages?: {
    path: string | null;
    errorMessage: string;
  };
  meta?: {
    page?: number;
    limit?: number;
    count: number;
  };
  stack?: string;
  data: T | null;
};
const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    errorMessages: data.errorMessages,
    stack: data.stack,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };
  res.status(res.statusCode).json(responseData);
};

export default sendResponse;
