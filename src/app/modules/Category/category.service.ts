import { Category } from '@prisma/client';
import prisma from '../../shared/prisma';
// import { jwtHelpers } from '../../helpers/jwtHelper';

const createCategory = async (data: Category, token: string) => {
  if (!token) {
    throw new Error('Token is required');
  }
  // const decodedToken = jwtHelpers.decodeToken(token);

  const result = await prisma.category.create({
    data,
  });
  return result;
};
const getCategories = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany({});
  return result;
};
export const categoryService = { createCategory, getCategories };
