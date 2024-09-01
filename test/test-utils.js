import { prismaClient } from '../src/application/database';

export const removeUser = async (username) => {
  await prismaClient.user.deleteMany({
    where: {
      username,
    },
  });
};
