import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import Link from "next/link";
import { redirect } from 'next/navigation';

// Define route-specific configurations
const routeConfig = {
  '/login': {
    title: 'Welcome Back',
    description: 'Sign in to your account to continue',
    footerText: "Don't have an account?",
    footerLink: '/register',
    footerLinkText: 'Create account'
  },
  '/register': {
    title: 'Create Account',
    description: 'Join us to get started with your journey',
    footerText: 'Already have an account?',
    footerLink: '/login',
    footerLinkText: 'Sign in'
  },
  '/reset-password': {
    title: 'Reset Password',
    description: 'Enter your email to receive reset instructions',
    footerText: 'Remember your password?',
    footerLink: '/login',
    footerLinkText: 'Back to login'
  }
};

// Route validation to ensure type safety
type ValidRoute = keyof typeof routeConfig;

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Server-side route detection
  const getCurrentRoute = (): ValidRoute => {
    if (typeof window === 'undefined') {
      // Server-side logic
      const headers = new Headers();
      const pathname = headers.get('x-pathname') || '/login';
      return pathname as ValidRoute;
    }
    // Fallback for client
    return '/login';
  };

  const currentRoute = getCurrentRoute();
  const config = routeConfig[currentRoute];

  // Redirect if invalid route
  if (!config) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Brand Element */}
      <div className="mb-8 text-center">
        <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          BlogStorm
        </h1>
      </div>

      {/* Auth Container */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{config.title}</CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </CardHeader>

        <CardContent>
          {children}
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {config.footerText}{' '}
            <Link
              href={config.footerLink}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {config.footerLinkText}
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Legal Footer */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          By continuing, you agree to our{' '}
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}