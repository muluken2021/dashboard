import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white z-1 dark:bg-gray-900">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row">
        
        {/* Left Side: Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-0">
          {children}
        </div>

        {/* Right Side: Hero Image & Branding */}
        <div className="relative hidden w-full h-full lg:w-1/2 lg:grid place-items-center overflow-hidden">
          {/* Background Image from Internet */}
          <img 
            src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200" 
            alt="Auth Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Dark Overlay to make Brand Color & White text pop */}
          <div className="absolute inset-0 bg-brand-950/60 backdrop-blur-[2px]"></div>

          <div className="relative flex flex-col items-center max-w-sm px-8 z-10 text-center">
            <Link to="/" className="block mb-6 transform transition hover:scale-105">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-2xl">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
            </Link>

            <h2 className="text-3xl font-bold text-white mb-4">
              Step into your store
            </h2>
            <p className="text-gray-200 font-medium leading-relaxed">
              Manage your inventory, track sales, and grow your ecommerce empire with our all-in-one dashboard.
            </p>
          </div>
          
          {/* Optional: Add a subtle grid pattern over the image */}
          <GridShape />
        </div>


      </div>
    </div>
  );
}