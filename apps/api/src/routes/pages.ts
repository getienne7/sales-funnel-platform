import { FastifyPluginAsync } from 'fastify';
const pageRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', { preHandler: [fastify.authenticate] }, async (request: any) => {
    return { pages: [] };
  });
};
export default pageRoutes;
