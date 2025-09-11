import { FastifyPluginAsync } from 'fastify';

const userRoutes: FastifyPluginAsync = async (fastify) => {
  // Get user profile
  fastify.get('/:id', {
    preHandler: [fastify.authenticate],
  }, async (request: any) => {
    const { id } = request.params;
    
    const user = await fastify.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        subscriptionTier: true,
        kycStatus: true,
        createdAt: true,
      },
    });

    return { user };
  });

  // Update user profile
  fastify.put('/:id', {
    preHandler: [fastify.authenticate],
  }, async (request: any) => {
    const { id } = request.params;
    const updates = request.body;

    const user = await fastify.prisma.user.update({
      where: { id },
      data: updates,
    });

    return { user };
  });
};

export default userRoutes;
