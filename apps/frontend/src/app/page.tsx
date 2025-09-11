import Link from 'next/link'
import { ArrowRightIcon, CubeIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative z-10">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
          <div className="flex h-16 items-center justify-between">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold crypto-gradient bg-clip-text text-transparent">
                  CryptoFunnel
                </span>
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              <Link href="/features" className="text-sm font-semibold leading-6 text-gray-900">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-semibold leading-6 text-gray-900">
                Pricing
              </Link>
              <Link href="/docs" className="text-sm font-semibold leading-6 text-gray-900">
                Documentation
              </Link>
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
              <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              The First{' '}
              <span className="crypto-gradient bg-clip-text text-transparent">
                Crypto-Native
              </span>{' '}
              Sales Funnel Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
              Build high-converting sales funnels specifically designed for cryptocurrency businesses. 
              Accept crypto payments, integrate with Web3 wallets, and track on-chain analytics - all in one platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 flex items-center gap-2"
              >
                Start Building Funnels
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/demo" className="text-sm font-semibold leading-6 text-gray-900">
                View Demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Everything you need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built for the Crypto Economy
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Unlike traditional funnel builders, we understand the unique needs of crypto businesses. 
              From DeFi protocols to NFT drops, we've got you covered.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <CurrencyDollarIcon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  Multi-Chain Crypto Payments
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Accept payments in Bitcoin, Ethereum, Polygon, BSC, and more. Built-in support for stablecoins, 
                    DeFi tokens, and automatic fiat conversion.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <ShieldCheckIcon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  Web3 & Compliance Ready
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Token-gated access, NFT verification, KYC/AML integration, and jurisdiction-based content. 
                    Stay compliant while embracing Web3.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <CubeIcon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  On-Chain Analytics
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Track wallet addresses, identify whales, monitor token flows, and analyze DeFi interactions. 
                    Get insights no traditional platform can provide.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to build your first crypto funnel?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              Join the future of crypto marketing. Start with our free trial and see the difference crypto-native tools make.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start Free Trial
              </Link>
              <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
                Contact Sales <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gray-500">
              Terms of Service
            </Link>
            <Link href="/support" className="text-gray-400 hover:text-gray-500">
              Support
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2024 CryptoFunnel Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
