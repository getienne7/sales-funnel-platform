import { FastifyPluginAsync } from 'fastify';

const funnelRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', { preHandler: [fastify.authenticate] }, async (request: any) => {
    return { funnels: [] };
  });
};

export default funnelRoutes;
