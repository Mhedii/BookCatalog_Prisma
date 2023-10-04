import { Book } from '@prisma/client';
import prisma from '../../shared/prisma';

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: { category: true },
  });
  return result;
};
const getBooks = async (
  page: number,
  size: number,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
  searchTerm: string,
  minPrice: number,
  maxPrice: number,
  filtersData: Record<string, unknown>,
): Promise<Book[] | any> => {
  console.log(minPrice, maxPrice);
  const result = await prisma.book.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              title: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              author: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              genre: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        },
        {
          categoryId: {
            equals: filtersData.category as string,
            mode: 'insensitive',
          },
        },
        {
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
      ],
    },

    take: size,
    skip: (page - 1) * size,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.book.count();

  const totalPage = await (Math.floor(total / size) | 1);
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    result,
  };
};
const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: { id },
  });
  return result;
};
const updateBook = async (
  id: string,
  payload: Partial<Book>,
): Promise<Partial<Book>> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteBook = async (id: string) => {
  const result = await prisma.book.delete({
    where: { id },
  });
  return result;
};
export const BookService = {
  createBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
