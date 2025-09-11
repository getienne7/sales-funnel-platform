import { FastifyPluginAsync } from 'fastify';
const leadRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', { preHandler: [fastify.authenticate] }, async (request: any) => {
    return { leads: [] };
  });
};
export default leadRoutes;
