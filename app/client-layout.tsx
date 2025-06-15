"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isLoginPage = pathname === '/login';
  const isHomePage = pathname === '/';
  // isAuthPage is currently not used but was part of the original conditional, keeping for context
  // const isAuthPage = isLoginPage || isHomePage; 

  return (
    <>
      {/* This header is no longer needed here as ConsoleNavigation will provide it */}
      {/* {!isAuthenticated && !isAuthPage && (
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-blue-800">
              <strong>Welcome!</strong> Please log in to access the full system.
            </div>
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </div>
      )} */}
      
      {children}
    </>
  );
} 