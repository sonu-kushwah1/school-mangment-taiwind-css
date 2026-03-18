"use client";

import { ReactNode, useState } from "react";
import Navbar from "@/component/header";
import Sidebar from "@/component/sidebar";
import Footer from "@/component/footer";

interface PageLayoutProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: PageLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">

      <Sidebar sidebarOpen={sidebarOpen} />

      <div
        className={`flex flex-col min-h-screen transition-all duration-300
        ${sidebarOpen ? "lg:ml-64" : "lg:ml-16"}`}
      >
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6 mt-16">
          {children}
        </main>

        <Footer />
      </div>

    </div>
  );
};

export default LayoutWrapper;