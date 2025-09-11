import { FastifyPluginAsync } from 'fastify';

const organizationRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', { preHandler: [fastify.authenticate] }, async (request: any) => {
    return { organizations: [] };
  });
};

export default organizationRoutes;
