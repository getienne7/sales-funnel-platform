import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: any, reply: any) => Promise<void>;
    hashPassword: (password: string) => Promise<string>;
    verifyPassword: (password: string, hash: string) => Promise<boolean>;
    generateTokens: (userId: string) => { accessToken: string; refreshToken: string };
  }
}

const authPlugin: FastifyPluginAsync = async (fastify) => {
  // Authentication middleware
  fastify.decorate('authenticate', async (request: any, reply: any) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        reply.code(401);
        throw new Error('No token provided');
      }

      const decoded = fastify.jwt.verify(token) as any;
      
      // Get user from database
      const user = await fastify.prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          organizations: {
            include: {
              organization: true
            }
          }
        }
      });

      if (!user) {
        reply.code(401);
        throw new Error('Invalid token');
      }

      request.user = user;
    } catch (error) {
      reply.code(401);
      throw new Error('Authentication failed');
    }
  });

  // Password hashing
  fastify.decorate('hashPassword', async (password: string): Promise<string> => {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  });

  // Password verification
  fastify.decorate('verifyPassword', async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
  });

  // Token generation
  fastify.decorate('generateTokens', (userId: string) => {
    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId, type: 'refresh' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  });
};

export default fp(authPlugin, {
  name: 'auth',
  dependencies: ['prisma', 'jwt']
});
