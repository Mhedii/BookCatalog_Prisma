/* eslint-disable @typescript-eslint/no-unused-vars */
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../helpers/jwtHelper';
import prisma from '../../shared/prisma';

const loginUser = async (payload: any): Promise<any> => {
  const { email, password }: { email: string; password: string } = payload;

  let isUserExist;
  const isUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUser) {
    throw new Error('User does not exist');
  }

  if (isUser && isUser.password !== password) {
    throw new Error('Password is incorrect');
  }
  const payloadData = {
    id: isUser!.id,
    role: isUser!.role,
  };

  const accessToken = jwtHelpers.createToken(
    payloadData,
    process.env.JWT_SECRET as Secret,
    process.env.EXPIRES_IN as string,
  );
  return { accessToken };
};

export const authService = { loginUser };
