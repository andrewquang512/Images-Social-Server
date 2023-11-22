// Prisma
import { PrismaClient } from '../prisma_modules/index.js';

export const prisma = new PrismaClient({
  ...(parseInt(process.env.IS_LOGGING) && {
    log: ['query', 'info', 'warn', 'error'],
  }),
});
