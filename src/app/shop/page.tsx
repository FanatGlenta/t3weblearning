"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageTemplate from "~/components/PageTemplate";
import ProductCard from "~/components/ProductCard";
import Loader from "~/components/Loader";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ShopHome() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/shop/products");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br"
    >
      <PageTemplate title="" description="">
        {/* Заголовок и описание в центре */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-800 md:text-5xl">
            🛍 Добро пожаловать в наш магазин!
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Выберите товары и добавьте их в корзину прямо сейчас 🚀
          </p>
        </motion.div>

        {products.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Loader />
        )}
      </PageTemplate>
    </motion.div>
  );
}
