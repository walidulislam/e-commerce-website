import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BDx GLORY | Premium Sneakers, Watches & Clothing",
  description: "Discover exclusive high-quality products at BDx GLORY. Modern, fast, and secure shopping experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased min-h-full flex flex-col`}>
        <AuthProvider>
          <WishlistProvider>
            <Toaster position="top-right" />
            <Navbar />
            <main className="flex-grow pt-16 pb-24 md:pb-0">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
