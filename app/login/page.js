"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Globe, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/");
    } catch (error) {
      console.error("Auth Error:", error.code);
      if (error.code === "auth/operation-not-allowed" || error.code === "auth/configuration-not-found") {
        toast.error("Auth providers (Email/Google) are NOT enabled in your Firebase Console.");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password.");
      } else {
        toast.error(error.message || "Failed to login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      router.push("/");
    } catch (error) {
      console.error("Google Auth Error:", error.code);
      if (error.code === "auth/operation-not-allowed") {
        toast.error("Google login is not enabled in Firebase Console.");
      } else {
        toast.error(error.message || "Google login failed");
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-zinc-100 dark:border-zinc-800">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Login to your BDx GLORY account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Password</label>
                <Link href="#" className="text-xs font-bold text-amber-500 hover:underline">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢"
                  className="w-full pl-12 pr-12 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-200 dark:shadow-none flex items-center justify-center space-x-2 active:scale-95 disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Login</span>
                  <LogIn className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100 dark:border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-900 px-4 text-zinc-500 font-bold">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-3 py-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95 mb-8"
          >
            <Globe className="w-5 h-5" />
            <span className="font-bold text-zinc-700 dark:text-zinc-200">Google</span>
          </button>

          <p className="text-center text-zinc-500 dark:text-zinc-400 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-amber-500 font-bold hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
