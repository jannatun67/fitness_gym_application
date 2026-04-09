'use client';

import { motion } from 'framer-motion';

import Image from 'next/image';

export default function Training() {
  return (
   <div className='max-w-[1691px] mx-auto'>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mb-10"
    >
      <h2 className="font-bold text-4xl text-gray-700 mb-[5px]">
        Train Like a Champion
      </h2>
      <p className="mb-[42px] font-medium text-[24px] text-gray-600">
        Unleash Your Power with Expert Boxing Training
      </p>
    </motion.div>
    <section className="bg-black text-white  rounded-3xl py-12 md:py-[39px] px-[39px]">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">

        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="rounded-3xl overflow-hidden">
            <Image
              src="/fitnessexErcising.png" 
              alt="training"
              width={512}
              height={591}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* MIDDLE CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Training Focus Areas:
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-[24px] text-gray-400 font-bold mb-2">
                Strength & Conditioning
              </h4>
              <p className="text-gray-400 text-[20px] leading-relaxed">
                Develop knockout power with a mix of strength training
                and explosive movements.
              </p>
            </div>

            <div>
              <h4 className="text-[24px] text-gray-400 font-bold mb-2">
                Speed & Agility
              </h4>
              <p className="text-gray-400 text-[20px] leading-relaxed">
                Sharpen your reflexes and footwork with dynamic drills
                that improve speed and coordination.
              </p>
            </div>

            <div>
              <h4 className="text-[24px] text-gray-400 font-bold mb-2">
                Endurance Training
              </h4>
              <p className="text-gray-400 text-[20px] leading-relaxed">
                Boost your stamina with high-intensity circuits that
                keep you fighting strong till the final round.
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl md:text-3xl font-bold mb-6">
            Why Train With Us:
          </h3>

          <div className="space-y-6 mb-10">
            <div>
              <h4 className="text-[24px] text-gray-400 font-bold mb-2">
                Expert Coaches
              </h4>
              <p className="text-gray-400 text-[20px] leading-relaxed">
                Our experienced boxing trainers have worked with amateur
                and professional athletes, ensuring you get the best training.
              </p>
            </div>

            <div>
              <h4 className="text-[24px] text-gray-400 font-bold mb-2">
                Flexible Programs
              </h4>
              <p className="text-gray-400 text-[20px] leading-relaxed">
                Whether youre a beginner or a seasoned boxer, we offer flexible
                programs that fit your schedule and needs.
              </p>
            </div>
          </div>

          {/* BUTTON + PLAY ICON */}
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#57B233] text-[28px] hover:bg-[#4aa12d] transition text-white px-16 py-6 rounded-xl font-bold shadow-lg"
            >
              Punch Now
            </motion.button>

            {/* Play Button */}
            <div className="w-14 h-14  border-dashed border-2 border-[#57B233] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
              <div className="w-0 h-0 border-l-[10px] border-l-[#57B233] border-y-[6px] border-y-transparent ml-1"></div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
   </div>
  );
}