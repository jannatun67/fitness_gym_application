'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Mint flavor chocolate',
    price: 399,
    rating: 4,
    image: '/product/product2.png',
    
  },
  {
    id: 2,
    name: 'Mint flavor chocolate',
    price: 399,
    rating: 4,
     image: '/product/product3.png',
    
  },
  {
    id: 3,
    name: 'Mint flavor chocolate',
    price: 399,
    rating: 4,
     image: '/product/product4.png',
  },
  {
    id: 4,
    name: 'Mint flavor chocolate',
    price: 399,
    rating: 4,
    image: '/product/product5.png',
    bg: 'bg-yellow-400',
  },
  {
    id: 5,
    name: 'Mint flavor chocolate',
    price: 399,
    rating: 4,
    image: '/product/product6.png',
    bg: 'bg-green-200',
  },
  {
    id: 6,
    name: 'Mint flavor chocolate',
    price: 399,
    rating: 4,
    image: '/product/product1.png',
   
  },
];

export default function ProductSection() {
  return (
    <section className=" text-white max-w-[1691px] py-20 px-6">
        <div className='text-black  mx-auto my-[43px]'>
             <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mb-6"
    >
      <h1 className="text-4xl font-bold">Our Products</h1>
      <p className="text-[24px] font-medium text-gray-500">
        Fuel Your Workouts with Protein-Packed Nutrition
      </p>
    </motion.div>
        </div>
      <div className="">

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Card */}
              <div className="relative p-[26px] bg-black rounded-3xl overflow-hidden">

                {/* Image box */}
                <div className={`${product.bg} mb-[38px] rounded-3xl`}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={494}
                      height={425}
                      className="mx-auto object-contain"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex justify-between items-center mt-4 ">
                  <div>
                    <h3 className="text-2xl font-medium">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[28px] font-medium">
                        ₹{product.price}.00
                      </p>

                      {/* Rating */}
                      <div className="flex text-green-400 text-[18px]">
                        {'★'.repeat(product.rating)}
                       <span className='text-white'> {'★'.repeat(5 - product.rating)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Add button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-green-500 p-[25px] hover:bg-green-600 transition w-[25px] h-[25px] flex items-center justify-center rounded-xl text-3xl"
                  >
                    +
                  </motion.button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}