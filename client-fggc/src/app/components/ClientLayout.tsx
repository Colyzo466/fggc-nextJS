"use client";

import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotificationToaster from "./NotificationToaster";
import dynamic from "next/dynamic";

const ErrorBoundary = dynamic(() => import("./ErrorBoundary"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-right" />
      <NotificationToaster />
      <ErrorBoundary>
        <Navbar />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </ErrorBoundary>
    </>
  );
}
