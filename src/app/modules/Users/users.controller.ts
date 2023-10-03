import { Request, Response } from 'express';
import { Users } from './users.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await Users.createUser(data);
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

export const usersController = { createUser };
