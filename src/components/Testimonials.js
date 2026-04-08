'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO Of Miko',
    avatarImage: '/clients/man1.png',
    review:
      'The boxing program helped me build confidence, strength, and endurance. The coaches are supportive and push you to be your best. Highly recommend for anyone serious about their fitness!',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Stive Meloni',
    role: 'CEO Of Miko',
    avatarImage: '/clients/man2.png',
    review:
      'The boxing program helped me build confidence, strength, and endurance. The coaches are supportive and push you to be your best. Highly recommend for anyone serious about their fitness!',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Stive Meloni',
    role: 'CEO Of Miko',
    avatarImage: '/clients/man3.png',
    review:
      'The boxing program helped me build confidence, strength, and endurance. The coaches are supportive and push you to be your best. Highly recommend for anyone serious about their fitness!',
    rating: 4.5,
  },
  {
    id: 4,
    name: 'Stive Meloni',
    role: 'CEO Of Miko',
    avatarImage: '/clients/man4.png',
    review:
      'The boxing program helped me build confidence, strength, and endurance. The coaches are supportive and push you to be your best. Highly recommend for anyone serious about their fitness!',
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Stive Meloni',
    role: 'CEO Of Miko',
    avatarImage: '/clients/man5.png',
    review:
      'The boxing program helped me build confidence, strength, and endurance. The coaches are supportive and push you to be your best. Highly recommend for anyone serious about their fitness!',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Stive Meloni',
    role: 'CEO Of Miko',
    avatarImage: '/clients/man6.png',
    review:
      'The boxing program helped me build confidence, strength, and endurance. The coaches are supportive and push you to be your best. Highly recommend for anyone serious about their fitness!',
    rating: 4.5,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-[2px] text-yellow-400 text-sm">
      {[...Array(5)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 !== 0;

        return (
          <div key={i} className="relative">
            <span className="text-gray-600">★</span>
            {(filled || half) && (
              <span
                className="absolute top-0 left-0 overflow-hidden text-yellow-400"
                style={{ width: half ? '50%' : '100%' }}
              >
                ★
              </span>
            )}
          </div>
        );
      })}
      <span className="text-gray-400 text-xs ml-1">({rating})</span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-gray-200 mt-[144px] max-w-7xl mx-auto rounded-3xl py-[50px] md:py-[45px] px-[48px] sm:px-6 lg:px-8">
      <div>
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="bg-[#1a1a1a] rounded-2xl p-6 md:p-8 flex flex-col gap-6 hover:shadow-xl hover:shadow-green-500/10 transition"
            >
              {/* CONTENT */}
              <div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-3">
                  The Best Training Program!
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t.review}
                </p>
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  
                  {/* Avatar Image */}
                  <Image
                    src={t.avatarImage}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />

                  <div>
                    <p className="text-white font-semibold text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {t.role}
                    </p>
                  </div>
                </div>

                <StarRating rating={t.rating} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}