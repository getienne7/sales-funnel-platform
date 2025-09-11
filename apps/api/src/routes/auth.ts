import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // Register schema
  const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  });

  // Login schema
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  // Wallet login schema
  const walletLoginSchema = z.object({
    walletAddress: z.string(),
    signature: z.string(),
    message: z.string(),
  });

  // Register endpoint
  fastify.post('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const body = registerSchema.parse(request.body);
      
      // Check if user already exists
      const existingUser = await fastify.prisma.user.findUnique({
        where: { email: body.email },
      });

      if (existingUser) {
        reply.code(400);
        return { error: 'User already exists' };
      }

      // Hash password
      const passwordHash = await fastify.hashPassword(body.password);

      // Create user
      const user = await fastify.prisma.user.create({
        data: {
          email: body.email,
          passwordHash,
          firstName: body.firstName,
          lastName: body.lastName,
        },
      });

      // Generate tokens
      const tokens = fastify.generateTokens(user.id);

      // Send welcome email
      await fastify.email.sendWelcomeEmail(
        user.email,
        user.firstName || 'User'
      );

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        ...tokens,
      };
    } catch (error) {
      fastify.log.error(error);
      reply.code(500);
      return { error: 'Registration failed' };
    }
  });

  // Login endpoint
  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const body = loginSchema.parse(request.body);

      // Find user
      const user = await fastify.prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!user || !user.passwordHash) {
        reply.code(401);
        return { error: 'Invalid credentials' };
      }

      // Verify password
      const isValidPassword = await fastify.verifyPassword(
        body.password,
        user.passwordHash
      );

      if (!isValidPassword) {
        reply.code(401);
        return { error: 'Invalid credentials' };
      }

      // Update last login
      await fastify.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      // Generate tokens
      const tokens = fastify.generateTokens(user.id);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        ...tokens,
      };
    } catch (error) {
      fastify.log.error(error);
      reply.code(500);
      return { error: 'Login failed' };
    }
  });

  // Wallet login endpoint
  fastify.post('/wallet-login', {
    schema: {
      body: {
        type: 'object',
        required: ['walletAddress', 'signature', 'message'],
        properties: {
          walletAddress: { type: 'string' },
          signature: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const body = walletLoginSchema.parse(request.body);

      // Verify signature
      const isValidSignature = fastify.web3.verifySignature(
        body.message,
        body.signature,
        body.walletAddress
      );

      if (!isValidSignature) {
        reply.code(401);
        return { error: 'Invalid signature' };
      }

      // Find or create user with wallet
      let user = await fastify.prisma.user.findFirst({
        where: {
          walletConnections: {
            some: {
              walletAddress: body.walletAddress,
            },
          },
        },
        include: {
          walletConnections: true,
        },
      });

      if (!user) {
        // Create new user with wallet
        user = await fastify.prisma.user.create({
          data: {
            email: `${body.walletAddress}@wallet.local`,
            walletConnections: {
              create: {
                walletAddress: body.walletAddress,
                walletType: 'METAMASK', // Default, can be detected
                chainId: 1, // Ethereum mainnet
                isPrimary: true,
                isVerified: true,
              },
            },
          },
          include: {
            walletConnections: true,
          },
        });
      }

      // Update last login
      await fastify.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      // Generate tokens
      const tokens = fastify.generateTokens(user.id);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          walletAddress: body.walletAddress,
        },
        ...tokens,
      };
    } catch (error) {
      fastify.log.error(error);
      reply.code(500);
      return { error: 'Wallet login failed' };
    }
  });

  // Refresh token endpoint
  fastify.post('/refresh', {
    schema: {
      body: {
        type: 'object',
        required: ['refreshToken'],
        properties: {
          refreshToken: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    try {
      const { refreshToken } = request.body as { refreshToken: string };

      // Verify refresh token
      const decoded = fastify.jwt.verify(refreshToken) as any;

      if (decoded.type !== 'refresh') {
        reply.code(401);
        return { error: 'Invalid refresh token' };
      }

      // Generate new tokens
      const tokens = fastify.generateTokens(decoded.userId);

      return tokens;
    } catch (error) {
      reply.code(401);
      return { error: 'Invalid refresh token' };
    }
  });

  // Get current user
  fastify.get('/me', {
    preHandler: [fastify.authenticate],
  }, async (request) => {
    const user = (request as any).user;
    
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscriptionTier: user.subscriptionTier,
      kycStatus: user.kycStatus,
      organizations: user.organizations,
    };
  });
};

export default authRoutes;
