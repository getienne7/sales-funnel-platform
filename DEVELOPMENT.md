# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ 
- Docker Desktop
- Git

### Quick Start
1. Clone the repository
2. Run setup script:
   - **Windows**: `scripts\setup.bat`
   - **Linux/Mac**: `chmod +x scripts/setup.sh && ./scripts/setup.sh`
3. Update `.env` with your API keys
4. Start development: `npm run dev`

## Development Workflow

### Project Structure
```
Sales Funnel Platform/
├── apps/
│   ├── api/                 # Backend API (Fastify + TypeScript)
│   └── frontend/            # Frontend App (Next.js + React)
├── packages/                # Shared packages (future)
├── scripts/                 # Setup and utility scripts
└── docs/                    # Documentation
```

### Available Commands

#### Root Level
- `npm run dev` - Start all development servers
- `npm run build` - Build all applications
- `npm run test` - Run all tests
- `npm run lint` - Lint all code
- `npm run clean` - Clean all build artifacts

#### Backend API (`apps/api/`)
- `npm run dev` - Start API server with hot reload
- `npm run build` - Build API for production
- `npm run start` - Start production API server
- `npm run test` - Run API tests
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

#### Frontend (`apps/frontend/`)
- `npm run dev` - Start Next.js development server
- `npm run build` - Build frontend for production
- `npm run start` - Start production frontend server
- `npm run lint` - Lint frontend code

## Development Environment

### Database Management
The project uses PostgreSQL with Prisma ORM:

1. **Schema Changes**: Edit `apps/api/prisma/schema.prisma`
2. **Create Migration**: `cd apps/api && npx prisma migrate dev --name your-migration-name`
3. **Apply Migration**: `cd apps/api && npx prisma migrate deploy`
4. **Reset Database**: `cd apps/api && npx prisma migrate reset`

### Environment Variables
Copy `.env.example` to `.env` and configure:

**Required for Development:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `NEXT_PUBLIC_WEB3_PROJECT_ID` - WalletConnect project ID

**Optional but Recommended:**
- `ALCHEMY_API_KEY` - For blockchain interactions
- `SMTP_*` - For email functionality
- `AWS_*` - For file uploads

### Docker Services
Development environment includes:
- **PostgreSQL** (port 5432) - Main database
- **Redis** (port 6379) - Caching and sessions
- **Elasticsearch** (port 9200) - Search functionality

Start services: `docker-compose -f docker-compose.dev.yml up -d`
Stop services: `docker-compose -f docker-compose.dev.yml down`

## Code Organization

### Backend Architecture
- **Routes** (`src/routes/`) - API endpoints
- **Plugins** (`src/plugins/`) - Fastify plugins for cross-cutting concerns
- **Services** (`src/services/`) - Business logic
- **Models** (`src/models/`) - Data models and validation
- **Utils** (`src/utils/`) - Utility functions

### Frontend Architecture
- **App Router** (`src/app/`) - Next.js 13+ app directory
- **Components** (`src/components/`) - Reusable UI components
- **Hooks** (`src/hooks/`) - Custom React hooks
- **Services** (`src/services/`) - API client and external services
- **Utils** (`src/utils/`) - Utility functions
- **Types** (`src/types/`) - TypeScript type definitions

## Testing Strategy

### Backend Testing
- **Unit Tests**: Jest for individual functions
- **Integration Tests**: Supertest for API endpoints
- **Database Tests**: In-memory SQLite for fast tests

### Frontend Testing
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright (future)
- **Visual Tests**: Storybook (future)

### Running Tests
```bash
# All tests
npm run test

# Backend only
cd apps/api && npm run test

# Frontend only
cd apps/frontend && npm run test

# Watch mode
npm run test:watch
```

## Debugging

### Backend Debugging
1. Set breakpoints in VS Code
2. Run debug configuration "Debug API"
3. Or use: `cd apps/api && npm run dev:debug`

### Frontend Debugging
1. Use React Developer Tools
2. Next.js built-in debugging
3. Browser DevTools

### Database Debugging
- Use Prisma Studio: `cd apps/api && npm run db:studio`
- Check logs: `docker-compose logs postgres`

## Performance Monitoring

### Development
- Next.js built-in performance metrics
- Fastify request logging
- Database query logging (Prisma)

### Production (Future)
- DataDog integration
- Sentry error tracking
- Custom metrics dashboard

## Security Considerations

### Development
- Never commit `.env` files
- Use strong JWT secrets
- Validate all inputs
- Sanitize database queries

### Production Checklist
- [ ] Update all default secrets
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Audit dependencies

## Deployment

### Staging
1. Build applications: `npm run build`
2. Run tests: `npm run test`
3. Deploy to staging environment
4. Run smoke tests

### Production
1. All staging checks pass
2. Database migrations applied
3. Environment variables configured
4. Monitoring enabled
5. Backup procedures in place

## Contributing

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful commit messages
- Add tests for new features

### Pull Request Process
1. Create feature branch
2. Make changes with tests
3. Update documentation
4. Submit PR with description
5. Address review feedback

## Troubleshooting

### Common Issues

**Database Connection Failed**
- Check Docker containers are running
- Verify DATABASE_URL in .env
- Check PostgreSQL logs

**Frontend Build Errors**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors

**API Server Won't Start**
- Check port 4000 is available
- Verify all environment variables
- Check API logs for errors

**Web3 Integration Issues**
- Verify WalletConnect project ID
- Check network RPC URLs
- Ensure wallet is connected

### Getting Help
1. Check this documentation
2. Search existing issues
3. Create detailed bug report
4. Ask in team chat

## Resources

- [Fastify Documentation](https://www.fastify.io/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
