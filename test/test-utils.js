import { prismaClient } from '../src/application/database.js';

export const removeUser = async (username) => {
  await prismaClient.user.deleteMany({
    where: {
      username,
    },
  });
};
