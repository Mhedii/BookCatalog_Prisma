import { jwtHelpers } from '../../helpers/jwtHelper';
import prisma from '../../shared/prisma';

const getProfile = async (token: string) => {
  const decodedToken = jwtHelpers.decodeToken(token);
  const { id } = decodedToken;

  const result = await prisma.user.findUnique({
    where: { id: id },
  });
  return result;
};

export const profileService = { getProfile };
