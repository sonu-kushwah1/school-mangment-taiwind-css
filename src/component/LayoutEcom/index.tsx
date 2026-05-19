// components/Layout.tsx
import React from "react";
import Header from "@/component/HeaderEcom";
import Footer from "@/component/FooterEcom";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutEcom = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LayoutEcom;