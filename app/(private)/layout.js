'use client'
import { Sidebar, Header } from "../_layouts";
import "../globals.css";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [isToggledSidebar, setIsToggledSidebar] = useState(true);
  return (<html lang="en">
    <head>
      <title>Admin Dashboard | LUXE</title>
    </head>
    <body className="font-montserrat bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        <Sidebar isToggledSidebar={isToggledSidebar} setIsToggledSidebar={setIsToggledSidebar} />
        <div id="main-content" className={`flex flex-col overflow-hidden ${isToggledSidebar ? 'content-expanded' : 'content-collapsed'}`}>
          <Header />
          {children}
        </div>
      </div>
    </body>

  </html>
  );
}
