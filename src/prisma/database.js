// Prisma
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  ...(parseInt(process.env.IS_LOGGING) && {
    log: ['query', 'info', 'warn', 'error'],
  }),
});
