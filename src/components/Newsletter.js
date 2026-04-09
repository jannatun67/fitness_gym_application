'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      alert('Subscribed successfully!');
    }, 1000);
  };

  return (
    <section className="bg-black max-w-[1413px] mx-auto rounded-3xl mt-[149px] py-[80px] md:py-[100px] px-6 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Eyebrow */}
        <p className="text-white text-[28px] md:text-[28px] font-medium mb-3 tracking-wide">
          Join our community
        </p>

        {/* Heading */}
        <h2 className="text-white text-3xl md:text-5xl font-normal my-5 leading-tight">
          Subscribe to our{' '}
          <span className="relative inline-block">
            newsletter

            {/* 👉 IMAGE UNDERLINE */}
            <Image
              src="/Vector 4.png" // ⚠️ image path
              alt="underline"
              width={300}
              height={20}
              className="absolute -bottom-3 left-0 w-full"
            />
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-[18px] md:text-[18px] my-5 leading-relaxed">
          Join Our Community Of Fitness Enthusiasts And Athletes! By Subscribing To Our Newsletter,
          You&apos;ll Receive Expert Training Tips, Nutrition Guides, Exclusive Discounts, And The
          Latest News On Upcoming Events And Products.
        </p>

        {/* Input row */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mx-auto rounded-full border border-gray-200 px-3 py-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            required
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-[22px] md:text-[22px] font-bold px-4 py-2 outline-none"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-black font-medium text-[18px] md:text-[18px] px-6 py-3 rounded-full transition hover:bg-gray-200 disabled:opacity-60 w-full sm:w-auto"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </motion.div>
    </section>
  );
}