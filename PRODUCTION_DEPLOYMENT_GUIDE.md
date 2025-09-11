# Production Deployment Guide - Phase 1

## 🚀 Phase 1: Platform Setup & Account Creation

### Step 1: Create Vercel Account (Frontend Deployment)

1. **Go to Vercel**: https://vercel.com/signup
2. **Sign up with GitHub** (recommended for easy integration)
3. **Import your repository**: `getienne7/sales-funnel-platform`
4. **Configure build settings**:
   - Framework Preset: `Next.js`
   - Root Directory: `apps/frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 2: Create Railway Account (Backend Deployment)

1. **Go to Railway**: https://railway.app/
2. **Sign up with GitHub**
3. **Create new project** → **Deploy from GitHub repo**
4. **Select**: `getienne7/sales-funnel-platform`
5. **Configure service**:
   - Root Directory: `apps/api`
   - Start Command: `npm start`
   - Port: `4000`

### Step 3: Set Up Neon Database

1. **Go to Neon**: https://neon.tech/
2. **Create account** and **new project**
3. **Database name**: `cryptofunnel-prod`
4. **Region**: Choose closest to your users
5. **Copy connection string** (you'll need this for environment variables)

### Step 4: Configure Environment Variables

#### For Railway (Backend):
```bash
DATABASE_URL=postgresql://username:password@host:5432/cryptofunnel-prod
JWT_SECRET=your-super-secure-jwt-secret-here
NODE_ENV=production
PORT=4000
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

#### For Vercel (Frontend):
```bash
NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app
NEXT_PUBLIC_WEB3_PROJECT_ID=your-walletconnect-project-id
```

## 📋 Phase 1 Checklist

### Account Setup
- [ ] Vercel account created and GitHub connected
- [ ] Railway account created and GitHub connected  
- [ ] Neon database created and connection string obtained
- [ ] Domain purchased (optional but recommended)

### Repository Configuration
- [ ] Vercel project linked to `apps/frontend` directory
- [ ] Railway service linked to `apps/api` directory
- [ ] Environment variables configured on both platforms
- [ ] Build settings verified

### Initial Deployment Test
- [ ] Frontend deploys successfully on Vercel
- [ ] Backend deploys successfully on Railway
- [ ] Database connection established
- [ ] Health check endpoints responding

## 🔧 Quick Setup Commands

### Install CLI Tools
```bash
# Vercel CLI
npm install -g vercel

# Railway CLI  
npm install -g @railway/cli

# Login to services
vercel login
railway login
```

### Deploy Frontend to Vercel
```bash
cd "Sales Funnel Platform/apps/frontend"
vercel --prod
```

### Deploy Backend to Railway
```bash
cd "Sales Funnel Platform/apps/api"
railway deploy
```

### Set Up Database
```bash
cd "Sales Funnel Platform/apps/api"
npx prisma migrate deploy
npx prisma db seed
```

## 🌐 Expected URLs After Phase 1

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-service-name.railway.app`
- **Database**: Neon PostgreSQL connection established

## 🚨 Common Issues & Solutions

### Vercel Build Errors
- Ensure `apps/frontend` is set as root directory
- Check that all dependencies are in `package.json`
- Verify environment variables are set

### Railway Deployment Issues
- Confirm `apps/api` is set as root directory
- Check that `PORT` environment variable is set to `4000`
- Verify database connection string format

### Database Connection Problems
- Ensure Neon database is in "Active" state
- Check connection string includes SSL parameters
- Verify IP allowlist includes Railway's IP ranges

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app/
- **Neon Docs**: https://neon.tech/docs/
- **Next.js Deployment**: https://nextjs.org/docs/deployment

## ⏭️ Next Steps

Once Phase 1 is complete:
1. Test the deployed applications
2. Configure custom domain (if purchased)
3. Set up SSL certificates
4. Move to Phase 2: Backend Infrastructure optimization

---

**Estimated Time**: 2-4 hours
**Difficulty**: Beginner to Intermediate
**Cost**: ~$0-5 for initial setup (free tiers available)
