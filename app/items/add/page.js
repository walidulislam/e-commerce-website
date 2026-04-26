"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import { 
  Package, 
  Type, 
  AlignLeft, 
  DollarSign, 
  Image as ImageIcon, 
  Tag, 
  Plus,
  Loader2,
  CheckCircle
} from "lucide-react";
import { saveItem } from "@/lib/storage";
import toast from "react-hot-toast";

export default function AddItemPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "Electronics",
    image: "",
    specifications: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newItem = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        price: parseFloat(formData.price),
        date: new Date().toISOString().split("T")[0],
        specifications: formData.specifications.split(",").map(s => s.trim()).filter(s => s),
        rating: 5.0
      };

      saveItem(newItem);
      toast.success("Product added successfully!");
      router.push("/items");
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-[3rem] shadow-xl border border-zinc-100 dark:border-zinc-800 p-8 md:p-12"
        >
          <div className="flex items-center space-x-4 mb-10">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-[1.5rem] flex items-center justify-center">
              <Package className="text-amber-600 dark:text-amber-400 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Add New Product</h1>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">List your premium item on BDx GLORY</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ml-1 flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span>Product Title</span>
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Pro Studio Monitor"
                  className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ml-1 flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
                >
                  <option>Electronics</option>
                  <option>Fitness</option>
                  <option>Home Decor</option>
                  <option>Furniture</option>
                  <option>Accessories</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ml-1 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Price (BDT - Ã Â§Â³)</span>
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="299.99"
                  className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ml-1 flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Image URL</span>
                </label>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://unsplash.com/..."
                  className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ml-1 flex items-center space-x-2">
                <AlignLeft className="w-4 h-4" />
                <span>Short Description</span>
              </label>
              <input
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Brief summary (1-2 lines)"
                className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ml-1">Full Description</label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                rows="4"
                placeholder="Detailed information about the product..."
                className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                required
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 ml-1">Specifications (comma separated)</label>
              <input
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                placeholder="40 hours battery, Bluetooth 5.2, Water-resistant"
                className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-5 rounded-[2rem] transition-all shadow-xl shadow-amber-200 dark:shadow-none flex items-center justify-center space-x-3 active:scale-95 disabled:opacity-70"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-6 h-6" />
                    <span>Add Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
