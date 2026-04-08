'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          width={400}
          height={400}
        />
        <div className="absolute top-4 right-4 bg-primary text-black px-3 py-1 rounded-full text-sm font-bold">
          -{product.discount}%
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <div className="flex items-center space-x-1">
            <i className="fas fa-star text-yellow-400 text-sm"></i>
            <span className="text-sm text-gray-400">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            <span className="text-gray-500 line-through ml-2">${product.originalPrice}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition-colors"
          >
            <i className="fas fa-plus"></i>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}