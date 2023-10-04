import { Order } from '@prisma/client';
import prisma from '../../shared/prisma';
import { jwtHelpers } from '../../helpers/jwtHelper';

const createOrder = async (data: any, token: string) => {
  if (!token) {
    throw new Error('Token is required');
  }
  const decodedToken = jwtHelpers.decodeToken(token);
  //   const { id } = decodedToken;
  const userId = decodedToken.id;

  const orderedBooks = Array.isArray(data.orderedBooks)
    ? data.orderedBooks
    : [];

  const result = await prisma.order.create({
    data: {
      userId,
      orderedBooks: {
        // create: data.bookId,
        create: orderedBooks.map((item: any) => ({
          bookId: item.bookId,
          quantity: item.quantity,
        })),
      },
      status: 'pending',

      //   include: {
      //     orderedBooks: true, // Include the orderedBooks in the response
      //   },
    },
    include: { orderedBooks: true },
  });

  return result;
};
const getOrders = async (token: string): Promise<Order[] | null> => {
  if (!token) {
    throw new Error('Token is required');
  }
  const decodedToken = jwtHelpers.decodeToken(token);
  const { id, role } = decodedToken;
  if (role === 'admin') {
    const result = await prisma.order.findMany({
      include: { orderedBooks: true },
    });
    return result;
  } else {
    const result = await prisma.order.findMany({
      where: {
        userId: id,
      },
      include: { orderedBooks: true },
    });
    return result;
  }
};
//   const getSingleCategory = async (id: string): Promise<Category | null> => {
//     const result = await prisma.category.findUnique({
//       where: { id },
//       include: { Book: true },
//     });
//     return result;
//   };

export const orderService = {
  createOrder,
  getOrders,
  // getSingleOrder,
};
