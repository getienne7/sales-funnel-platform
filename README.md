# Crypto Sales Funnel Platform

The first comprehensive sales funnel platform specifically designed for cryptocurrency businesses, enabling crypto projects, DeFi protocols, NFT creators, trading services, and blockchain startups to create high-converting funnels with native crypto payment integration, compliance features, and Web3-specific marketing tools.

## 🚀 Features

### Core Platform
- **Visual Drag-and-Drop Funnel Builder** - Intuitive interface with crypto-specific components
- **Multi-Chain Crypto Payments** - Bitcoin, Ethereum, Polygon, BSC, Solana support
- **Web3 Integration** - Wallet connection, NFT gating, token-based access control
- **Compliance Ready** - KYC/AML tools, jurisdiction blocking, regulatory templates
- **On-Chain Analytics** - Whale identification, token flow analysis, DeFi metrics

### Crypto-Specific Templates
- ICO/IDO Launch Funnels
- NFT Drop Funnels  
- DeFi Protocol Onboarding
- Trading Signal Services
- Crypto Course Platforms
- Exchange Onboarding
- Staking Services
- DAO Membership

## 🏗️ Architecture

### Backend (Node.js/Fastify)
- **API Framework**: Fastify with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for sessions and performance
- **Authentication**: JWT with wallet signature support
- **Web3 Integration**: Ethers.js and Web3.js for multi-chain support
- **Email**: Nodemailer with SendGrid integration

### Frontend (Next.js/React)
- **Framework**: Next.js 13+ with App Router
- **UI Library**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom crypto themes
- **State Management**: Zustand + React Query
- **Web3**: Wagmi + Viem for wallet connections
- **Drag & Drop**: @dnd-kit for funnel builder

### Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes on AWS EKS
- **CI/CD**: GitHub Actions + ArgoCD
- **Monitoring**: DataDog + Sentry
- **CDN**: CloudFront for global performance

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/your-org/crypto-sales-funnel-platform.git
cd crypto-sales-funnel-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy example environment files
cp apps/api/.env.example apps/api/.env
cp apps/frontend/.env.example apps/frontend/.env

# Edit the files with your configuration
```

4. **Start development environment**
```bash
# Start all services with Docker
npm run docker:dev

# Or start services individually
npm run dev
```

5. **Initialize the database**
```bash
npm run db:migrate
npm run db:seed
```

6. **Access the application**
- Frontend: http://localhost:3000
- API: http://localhost:4000
- API Docs: http://localhost:4000/docs

### Environment Variables

#### Backend (.env)
```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crypto_funnel_dev"
REDIS_URL="redis://localhost:6379"

# Authentication
JWT_SECRET="your-jwt-secret-key"
ENCRYPTION_KEY="your-32-character-encryption-key"

# Blockchain RPC URLs
ETHEREUM_RPC_URL="https://mainnet.infura.io/v3/your-project-id"
POLYGON_RPC_URL="https://polygon-mainnet.infura.io/v3/your-project-id"
BSC_RPC_URL="https://bsc-dataseed.binance.org/"

# Email
SMTP_HOST="smtp.sendgrid.net"
SMTP_USER="apikey"
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@cryptofunnel.io"

# External APIs
COINBASE_COMMERCE_API_KEY="your-coinbase-commerce-key"
CHAINALYSIS_API_KEY="your-chainalysis-key"
```

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL="http://localhost:4000"
NEXT_PUBLIC_WEB3_PROJECT_ID="your-walletconnect-project-id"
```

## 📁 Project Structure

```
crypto-sales-funnel-platform/
├── apps/
│   ├── api/                    # Backend API (Fastify)
│   │   ├── src/
│   │   │   ├── routes/         # API route handlers
│   │   │   ├── plugins/        # Fastify plugins
│   │   │   ├── services/       # Business logic
│   │   │   └── types/          # TypeScript definitions
│   │   ├── prisma/             # Database schema & migrations
│   │   └── tests/              # API tests
│   └── frontend/               # Frontend app (Next.js)
│       ├── src/
│       │   ├── app/            # Next.js app router
│       │   ├── components/     # React components
│       │   ├── hooks/          # Custom React hooks
│       │   ├── lib/            # Utility functions
│       │   └── store/          # State management
│       └── public/             # Static assets
├── packages/                   # Shared packages
│   ├── shared/                 # Common utilities
│   └── web3/                   # Web3 integrations
├── infra/                      # Infrastructure configs
│   ├── docker/                 # Docker configurations
│   └── k8s/                    # Kubernetes manifests
└── docs/                       # Documentation
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run API tests
cd apps/api && npm run test

# Run frontend tests
cd apps/frontend && npm run test

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### GitHub Pages (Demo/Showcase)
For a quick demo deployment to GitHub Pages:

```bash
# Run the setup script
scripts/setup-github-pages.bat    # Windows
# or
./scripts/setup-github-pages.sh   # Linux/Mac

# Then follow the instructions to:
# 1. Create a GitHub repository
# 2. Push your code
# 3. Enable GitHub Pages with GitHub Actions
```

**Live Demo**: The static demo will be available at `https://yourusername.github.io/repository-name`

**What's included in GitHub Pages version:**
- Complete landing page with all sections
- Responsive design for all devices
- Interactive elements and animations
- SEO-optimized static site
- Professional crypto-focused branding

For detailed GitHub Pages setup instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Development
```bash
npm run docker:dev
```

### Production (Full Application)
```bash
# Build all applications
npm run build

# Deploy to Kubernetes
kubectl apply -f infra/k8s/
```

**Production Deployment Options:**
- **Vercel/Netlify**: For the Next.js frontend
- **Railway/Render**: For full-stack deployment
- **AWS/GCP/Azure**: For enterprise deployment
- **Docker**: Containerized deployment anywhere

## 📊 Monitoring & Analytics

- **Application Monitoring**: DataDog dashboards
- **Error Tracking**: Sentry integration
- **Performance**: Lighthouse CI in pipeline
- **Security**: Snyk vulnerability scanning

## 🔐 Security

- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Compliance**: GDPR, SOC 2 Type II ready
- **Blockchain Security**: Multi-signature wallets, smart contract audits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.cryptofunnel.io](https://docs.cryptofunnel.io)
- **Community**: [Discord](https://discord.gg/cryptofunnel)
- **Issues**: [GitHub Issues](https://github.com/your-org/crypto-sales-funnel-platform/issues)
- **Email**: support@cryptofunnel.io

## 🗺️ Roadmap

### Phase 1 (Q1 2024) - MVP
- [x] Core funnel builder
- [x] Basic crypto payments
- [x] Web3 wallet integration
- [x] Email automation
- [ ] Analytics dashboard

### Phase 2 (Q2 2024) - Enhanced Features
- [ ] A/B testing engine
- [ ] Advanced compliance tools
- [ ] CRM functionality
- [ ] Mobile app

### Phase 3 (Q3 2024) - Enterprise
- [ ] White labeling
- [ ] Advanced automation
- [ ] AI-powered optimization
- [ ] Enterprise security features

---

Built with ❤️ for the crypto community
