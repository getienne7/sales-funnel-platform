import { FastifyPluginAsync } from 'fastify';
const analyticsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/dashboard', { preHandler: [fastify.authenticate] }, async (request: any) => {
    return { analytics: {} };
  });
};
export default analyticsRoutes;
