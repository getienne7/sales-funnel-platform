import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import nodemailer from 'nodemailer';

declare module 'fastify' {
  interface FastifyInstance {
    email: {
      sendWelcomeEmail: (to: string, name: string) => Promise<void>;
      sendPasswordResetEmail: (to: string, resetToken: string) => Promise<void>;
      sendKycStatusEmail: (to: string, status: string) => Promise<void>;
      sendPaymentConfirmationEmail: (to: string, paymentDetails: any) => Promise<void>;
      sendCustomEmail: (to: string, subject: string, html: string) => Promise<void>;
    };
  }
}

const emailPlugin: FastifyPluginAsync = async (fastify) => {
  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'apikey',
      pass: process.env.SMTP_PASS || process.env.SENDGRID_API_KEY,
    },
  });

  const emailUtils = {
    sendWelcomeEmail: async (to: string, name: string): Promise<void> => {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to Crypto Funnel Platform!</h1>
          <p>Hi ${name},</p>
          <p>Welcome to the first comprehensive sales funnel platform designed specifically for cryptocurrency businesses!</p>
          <p>You can now:</p>
          <ul>
            <li>Create high-converting crypto funnels</li>
            <li>Accept payments in multiple cryptocurrencies</li>
            <li>Integrate with Web3 wallets and DeFi protocols</li>
            <li>Track on-chain analytics and whale behavior</li>
          </ul>
          <p>Get started by creating your first funnel in the dashboard.</p>
          <p>Best regards,<br>The Crypto Funnel Team</p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.FROM_EMAIL || 'noreply@cryptofunnel.io',
        to,
        subject: 'Welcome to Crypto Funnel Platform',
        html,
      });
    },

    sendPasswordResetEmail: async (to: string, resetToken: string): Promise<void> => {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Password Reset Request</h1>
          <p>You requested a password reset for your Crypto Funnel Platform account.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this reset, please ignore this email.</p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.FROM_EMAIL || 'noreply@cryptofunnel.io',
        to,
        subject: 'Password Reset Request',
        html,
      });
    },

    sendKycStatusEmail: async (to: string, status: string): Promise<void> => {
      const statusMessages = {
        approved: {
          subject: 'KYC Verification Approved',
          message: 'Your KYC verification has been approved! You now have access to all platform features.',
          color: '#10b981'
        },
        rejected: {
          subject: 'KYC Verification Rejected',
          message: 'Your KYC verification was rejected. Please contact support for more information.',
          color: '#ef4444'
        },
        pending: {
          subject: 'KYC Verification Under Review',
          message: 'Your KYC verification is currently under review. We\'ll notify you once it\'s complete.',
          color: '#f59e0b'
        }
      };

      const statusInfo = statusMessages[status as keyof typeof statusMessages] || statusMessages.pending;

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: ${statusInfo.color};">KYC Status Update</h1>
          <p>${statusInfo.message}</p>
          <p>If you have any questions, please contact our support team.</p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.FROM_EMAIL || 'noreply@cryptofunnel.io',
        to,
        subject: statusInfo.subject,
        html,
      });
    },

    sendPaymentConfirmationEmail: async (to: string, paymentDetails: any): Promise<void> => {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">Payment Confirmed</h1>
          <p>Your cryptocurrency payment has been confirmed!</p>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3>Payment Details:</h3>
            <p><strong>Amount:</strong> ${paymentDetails.amount} ${paymentDetails.tokenSymbol}</p>
            <p><strong>USD Value:</strong> $${paymentDetails.usdValue}</p>
            <p><strong>Network:</strong> ${paymentDetails.network}</p>
            <p><strong>Transaction Hash:</strong> ${paymentDetails.transactionHash}</p>
          </div>
          <p>Thank you for your payment!</p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.FROM_EMAIL || 'noreply@cryptofunnel.io',
        to,
        subject: 'Payment Confirmation',
        html,
      });
    },

    sendCustomEmail: async (to: string, subject: string, html: string): Promise<void> => {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL || 'noreply@cryptofunnel.io',
        to,
        subject,
        html,
      });
    },
  };

  fastify.decorate('email', emailUtils);
};

export default fp(emailPlugin, {
  name: 'email'
});
