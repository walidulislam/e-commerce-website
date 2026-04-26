"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  Trash2, 
  Settings, 
  Package, 
  ChevronRight,
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { getStoredItems, deleteStoredItem } from "@/lib/storage";
import toast from "react-hot-toast";

export default function ManageItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getStoredItems());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = deleteStoredItem(id);
      setItems(updated);
      toast.success("Product deleted successfully");
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-zinc-900 dark:text-white mb-2 flex items-center space-x-3">
               <Settings className="w-10 h-10 text-indigo-600" />
               <span>Manage Inventory</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">Control and monitor your product listings</p>
          </div>
          <Link
            href="/items/add"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95 text-center"
          >
            Add New Product
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Product</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Category</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Price</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Date Added</th>
                  <th className="px-8 py-6 text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-bold text-zinc-900 dark:text-white truncate max-w-[200px]">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">{item.category}</span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-zinc-900 dark:text-white">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-8 py-6 text-sm text-zinc-500 dark:text-zinc-400">
                        {item.date}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/items/${item.id}`}
                            className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                <Package className="w-10 h-10 text-zinc-300" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No products found</h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-xs mb-8">You haven't added any products to your inventory yet.</p>
              <Link
                href="/items/add"
                className="text-indigo-600 font-bold hover:underline flex items-center space-x-2"
              >
                <span>Add your first product</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
