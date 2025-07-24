"use client";
import { Sidebar, Header } from "../_layouts";
import "../globals.css";
import { useState } from "react";
import {  QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/api/react-query";

export default function RootLayout({ children }) {
  const [isToggledSidebar, setIsToggledSidebar] = useState(true);

  const queryClient = getQueryClient();

  return (
    
      <html lang="en">
        <head>
          <title>Shipper Dashboard | LUXE</title>
        </head>
        <QueryClientProvider client={queryClient}>
          <body className="font-montserrat bg-gray-100">
            <div className="flex h-screen overflow-hidden">
              <Sidebar
                isToggledSidebar={isToggledSidebar}
                setIsToggledSidebar={setIsToggledSidebar}
              />
              <div
                id="main-content"
                className={`flex flex-col overflow-x-hidden ${
                  isToggledSidebar ? "content-expanded" : "content-collapsed"
                }`}
              >
                <Header />
                {children}
              </div>
            </div>
          </body>
        </QueryClientProvider>
      </html>
  );
}
