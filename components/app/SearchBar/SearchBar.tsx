"use client"
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/products');
    }
  };

  const clearSearch = () => {
    setQuery("");
    router.push('/products');
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="hidden md:flex relative items-center w-full max-w-md group"
    >
      <div className="absolute left-4 text-gray-400 group-focus-within:text-black transition-colors">
        <Search size={20} />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="w-full bg-[#F0F0F0] border-transparent focus:bg-white focus:border-black/10 focus:ring-4 focus:ring-black/5 py-3 pl-12 pr-10 rounded-full text-sm font-medium transition-all outline-none"
      />

      <AnimatePresence>
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={clearSearch}
            className="absolute right-4 text-gray-400 hover:text-black transition-colors"
          >
            <X size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}
