import { FastifyPluginAsync } from 'fastify';
const paymentRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', { preHandler: [fastify.authenticate] }, async (request: any) => {
    return { payments: [] };
  });
};
export default paymentRoutes;
