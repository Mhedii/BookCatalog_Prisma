import { User } from '@prisma/client'
import prisma from '../../shared/prisma'

const createUser = async (data: User) => {
  const result = await prisma.user.create({
    data,
  })
  return result
}
export const Users = { createUser }
