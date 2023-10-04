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
  //   minPrice:number,
  //   maxPrice:number,
  searchTerm: string,
  //   filtersData: Record<string, unknown>,
): Promise<Book[] | any> => {
  const result = await prisma.book.findMany({
    where: {
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

    take: size,
    skip: (page - 1) * size,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.book.count();
  return {
    meta: {
      page,
      size,
      total,
      //   totalPage,
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
