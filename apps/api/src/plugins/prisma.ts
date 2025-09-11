import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = async (fastify) => {
  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  });

  // Test the connection
  await prisma.$connect();

  // Add to fastify instance
  fastify.decorate('prisma', prisma);

  // Close connection when fastify closes
  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect();
  });
};

export default fp(prismaPlugin, {
  name: 'prisma'
});
