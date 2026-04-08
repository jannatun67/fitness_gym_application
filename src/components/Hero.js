'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <section
  className="min-h-screen max-w-7xl mx-auto overflow-hidden relative flex flex-col rounded-[32px] bg-cover bg-center"
  style={{
    backgroundImage: "url('/Subtract.png')",
  }}
>
      <Navbar />

      <div className="flex flex-1  relative">
        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col mt-[320px] relative z-20 "
        >
        <div
  className="absolute inset-0 rounded-l-[25px] w-[272px] bg-cover  bg-center"
  style={{
    backgroundImage: "url('/Vector 3.png')",
  }}
/>


          <div className="relative z-10 px-[15px] pt-25 pb-[15px]">
            <p className="text-gray-100 font-extrabold text-[18px] uppercase mb-5">
              Our Specialty
            </p>

            <div className="flex flex-col gap-4">
  {[
    { img: '/yoga1.png', label: 'Ground running' },
    { img: '/yoga2.png', label: 'Yoga Assistance' },
    { img: '/yoga3.png', label: 'Personal Trainer' },
  ].map((item) => (
    <div
      key={item.label}
      className="flex items-center gap-3 bg-white/20 hover:bg-black transition-all rounded-xl px-[35px] py-[29px] cursor-pointer"
    >
      <div className="w-12 h-12 p-2 bg-white/30 rounded-lg flex items-center justify-center">
        <Image
          src={item.img}
          alt={item.label}
          width={200}
          height={200}
          className="w-[62px] h-[62px]  object-contain"
        />
      </div>
      <span className="text-white font-semibold text-sm">
        {item.label}
      </span>
    </div>
  ))}
</div>

          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <div className="flex-1 relative">
          {/* IMAGE */}
          <Image
            src="/man.png"
            alt="athletes"
            fill
            className="object-cover object-center mt-[63px] grayscale"
            priority
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0" />

          {/* CONTENT */}
          <div className="absolute inset-0 z-10  flex flex-col justify-center px-10 lg:px-20">
           <motion.img
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  src="/POWER_YOUR_PONTETIALE.png"
  alt="POWER YOUR PONTETIALE"
  className="w-[750px] h-auto object-contain mt-[340px] ml-[140px]"
/>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 mt-5 ml-[140px]"
            >
              <button className="flex items-center gap-3 border border-white/50 rounded-xl px-6 py-3 text-white text-sm uppercase tracking-widest hover:bg-[#7ED321] transition">
                Shop Now
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-black">
                  <i className="fas fa-arrow-right text-xs"></i>
                </span>
              </button>

              <button className="w-12 h-12 flex items-center justify-center border border-white/50 rounded-xl hover:bg-[#7ED321] transition">
                <i className="fas fa-map-marker-alt text-white"></i>
              </button>
            </motion.div>
          </div>

          {/* DOTS (top right like design) */}
          <div className="absolute top-10 right-10 grid grid-cols-5 gap-2 opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}