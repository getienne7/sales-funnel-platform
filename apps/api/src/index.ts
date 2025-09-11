import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import redis from '@fastify/redis';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import organizationRoutes from './routes/organizations';
import funnelRoutes from './routes/funnels';
import pageRoutes from './routes/pages';
import leadRoutes from './routes/leads';
import paymentRoutes from './routes/payments';
import web3Routes from './routes/web3';
import analyticsRoutes from './routes/analytics';

// Import plugins
import authPlugin from './plugins/auth';
import prismaPlugin from './plugins/prisma';
import web3Plugin from './plugins/web3';
import emailPlugin from './plugins/email';

// Import types
import { FastifyInstance } from 'fastify';

const prisma = new PrismaClient();

async function buildServer(): Promise<FastifyInstance> {
  const server = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport: process.env.NODE_ENV === 'development' ? {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      } : undefined
    }
  });

  // Register plugins
  await server.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https:"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
  });

  await server.register(cors, {
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.FRONTEND_URL || 'https://app.cryptofunnel.io']
      : true,
    credentials: true
  });

  await server.register(jwt, {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production'
  });

  await server.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    }
  });

  await server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute'
  });

  await server.register(redis, {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD
  });

  // Swagger documentation
  await server.register(swagger, {
    swagger: {
      info: {
        title: 'Crypto Sales Funnel Platform API',
        description: 'API for the crypto-native sales funnel platform',
        version: '1.0.0'
      },
      host: process.env.API_HOST || 'localhost:4000',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      }
    }
  });

  await server.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    }
  });

  // Register custom plugins
  await server.register(prismaPlugin);
  await server.register(authPlugin);
  await server.register(web3Plugin);
  await server.register(emailPlugin);

  // Health check
  server.get('/health', async (request, reply) => {
    try {
      // Check database connection
      await prisma.$queryRaw`SELECT 1`;
      
      // Check Redis connection
      await server.redis.ping();

      return { 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0'
      };
    } catch (error) {
      reply.code(503);
      return { 
        status: 'unhealthy', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  });

  // Register API routes
  await server.register(authRoutes, { prefix: '/api/auth' });
  await server.register(userRoutes, { prefix: '/api/users' });
  await server.register(organizationRoutes, { prefix: '/api/organizations' });
  await server.register(funnelRoutes, { prefix: '/api/funnels' });
  await server.register(pageRoutes, { prefix: '/api/pages' });
  await server.register(leadRoutes, { prefix: '/api/leads' });
  await server.register(paymentRoutes, { prefix: '/api/payments' });
  await server.register(web3Routes, { prefix: '/api/web3' });
  await server.register(analyticsRoutes, { prefix: '/api/analytics' });

  // Global error handler
  server.setErrorHandler(async (error, request, reply) => {
    server.log.error(error);

    if (error.validation) {
      reply.code(400);
      return {
        error: 'Validation Error',
        message: error.message,
        details: error.validation
      };
    }

    if (error.statusCode) {
      reply.code(error.statusCode);
      return {
        error: error.name || 'Error',
        message: error.message
      };
    }

    reply.code(500);
    return {
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'production' 
        ? 'Something went wrong' 
        : error.message
    };
  });

  // 404 handler
  server.setNotFoundHandler(async (request, reply) => {
    reply.code(404);
    return {
      error: 'Not Found',
      message: `Route ${request.method} ${request.url} not found`
    };
  });

  return server;
}

async function start() {
  try {
    const server = await buildServer();
    
    const port = parseInt(process.env.PORT || '4000');
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({ port, host });
    
    server.log.info(`🚀 Server ready at http://${host}:${port}`);
    server.log.info(`📚 API Documentation available at http://${host}:${port}/docs`);
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

if (require.main === module) {
  start();
}

export { buildServer };
