"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/api/react-query";

import "../globals.css";

export default function PublicLayout({ children }) {
  const queryClient = getQueryClient();

  return (
    <html lang="en">
      <head>
        <title>Shipper Dashboard | LUXE</title>
      </head>
      <QueryClientProvider client={queryClient}>
        <body className="font-montserrat bg-gray-100">
          <div className="flex h-screen overflow-hidden">
            <div
              id="main-content"
              className={`flex flex-col overflow-hidden w-full`}
            >
              {children}
            </div>
          </div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
