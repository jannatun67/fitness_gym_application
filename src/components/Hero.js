"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="max-w-[1700px] -mt-2 md:mt-2 relative mx-auto ">
      <div className="">

        {/* ═══════════════════════════════════════
            DESKTOP (md+) — 100% UNCHANGED
        ═══════════════════════════════════════ */}
        <section
          className="hidden md:block h-[1080px] w-full "
          style={{
            backgroundImage: "url('/Group-2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Navbar />

          <div className="flex items-center gap-x-5 pt-18 pl-18">
            <h2 className="text-[24px] text-white/75 font-bold mt-2">
              Follow On:
            </h2>
            <div className="flex items-center gap-x-8">
              <Link href="#">
                <Image src="/facebook.png" alt="Social Media Icons" width={28} height={28} className="object-contain mt-4" />
              </Link>
              <Link href="#">
                <Image src="/instra.png" alt="Social Media Icons" width={28} height={28} className="object-contain mt-4" />
              </Link>
              <Link href="#">
                <Image src="/x.png" alt="Social Media Icons" width={28} height={28} className="object-contain mt-4" />
              </Link>
              <Link href="#">
                <Image src="/in.png" alt="Social Media Icons" width={28} height={28} className="object-contain mt-4" />
              </Link>
            </div>
          </div>

          <section>
            <div className="flex flex-1 relative">
              {/* LEFT PANEL */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden md:flex flex-col mt-30 relative z-20"
              >
                <div
                  className="absolute left-0 -mt-5 rounded-[78px] w-[376px] h-[743px] bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/bottom-left-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <div className="relative z-10 px-[15px] pt-48 pb-[15px]">
                  <p className="text-white/75 font-extrabold text-[30px] uppercase mb-5">
                    Our Specialty
                  </p>
                  <div className="flex flex-col gap-5 mb-5">
                    {[
                      { img: "/yoga1.png", label: "Ground running" },
                      { img: "/yoga2.png", label: "Yoga Assistance" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 border border-white/50 bg-white/20 transition-all rounded-3xl px-[35px] py-[29px] cursor-pointer"
                      >
                        <div className="w-[76px] h-[76px] bg-white/30 rounded-lg p-3 flex items-center justify-center">
                          <Image src={item.img} alt={item.label} width={200} height={200} className="w-[62px] h-[62px] object-contain" />
                        </div>
                        <span className="text-white font-bold text-[24px]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-5">
                    {[{ img: "/yoga3.png", label: "Personal Trainer" }].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 border border-white/50 bg-white/20 transition-all rounded-t-3xl rounded-r-3xl rounded-b-[65px] px-[35px] py-[29px] cursor-pointer"
                      >
                        <div className="w-[76px] h-[76px] bg-white/30 rounded-lg flex p-3 items-center justify-center">
                          <Image src={item.img} alt={item.label} width={200} height={200} className="w-[62px] h-[62px] object-contain" />
                        </div>
                        <span className="text-white font-bold text-[24px]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* RIGHT SIDE */}
              <div className="flex-1 mt-20 relative">
                <div className="absolute inset-0 z-10 flex flex-col justify-center px-10 lg:px-20">
                  <motion.img
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    src="/POWER_YOUR_PONTETIALE.png"
                    alt="POWER YOUR PONTETIALE"
                    className="w-[920px] h-auto object-contain mt-[280px] ml-[220px]"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-8 mt-5 mb-[76px] ml-[220px]"
                  >
                    <button className="flex items-center gap-3 border-white border-2 rounded-xl px-11 py-7 text-white text-[32px] uppercase tracking-widest hover:bg-[#7ED321] transition">
                      Shop Now
                      <Image src="/arrow-right.png" alt="Arrow Right" width={37} height={20} className="object-contain ml-6" />
                    </button>
                    <button className="flex items-center gap-3 border-white border-2 rounded-xl p-8 text-white text-[32px] uppercase tracking-widest hover:bg-[#7ED321] transition">
                      <Image src="/map.png" alt="Arrow Right" width={37} height={20} className="object-contain" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* ═══════════════════════════════════════
            MOBILE (below md) — custom design
        ═══════════════════════════════════════ */}
        <section
          className="md:hidden min-h-screen w-full flex flex-col overflow-hidden"
          style={{
            backgroundImage: "url('/Group-2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Navbar />

          {/* Hero content */}
          <div className="flex flex-col flex-1 px-5 pt-4 pb-8">

            {/* Tagline image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-6 mb-6"
            >
              <img
                src="/POWER_YOUR_PONTETIALE.png"
                alt="Power Your Potential"
                className="w-full max-w-[340px] mx-auto h-auto object-contain"
              />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#71AC16] hover:bg-[#5d9010] rounded-xl py-4 text-white text-[15px] font-black uppercase tracking-widest transition">
                Shop Now
                <Image src="/arrow-right.png" alt="" width={20} height={12} className="object-contain" />
              </button>
              <button className="flex items-center justify-center w-14 h-14 border-2 border-white/60 rounded-xl hover:bg-[#7ED321] transition">
                <Image src="/map.png" alt="Map" width={22} height={22} className="object-contain" />
              </button>
            </motion.div>

            {/* Our Specialty */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <p className="text-white/70 font-extrabold text-[13px] uppercase tracking-[0.18em] mb-4">
                Our Specialty
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { img: "/yoga1.png", label: "Ground Running", rounded: "rounded-2xl" },
                  { img: "/yoga2.png", label: "Yoga Assistance", rounded: "rounded-2xl" },
                  { img: "/yoga3.png", label: "Personal Trainer", rounded: "rounded-t-2xl rounded-r-2xl rounded-b-[40px]" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`flex items-center gap-4 border border-white/30 bg-white/15 backdrop-blur-sm px-4 py-4 cursor-pointer active:scale-[0.98] transition ${item.rounded}`}
                  >
                    <div className="w-14 h-14 bg-white/20 rounded-xl p-2.5 flex items-center justify-center shrink-0">
                      <Image src={item.img} alt={item.label} width={48} height={48} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-white font-bold text-[17px]">{item.label}</span>
                    <i className="fas fa-chevron-right text-white/30 text-xs ml-auto"></i>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-4"
            >
              <span className="text-white/50 text-[12px] font-bold uppercase tracking-widest">Follow:</span>
              <div className="flex items-center gap-3">
                {[
                  { src: "/facebook.png", alt: "Facebook" },
                  { src: "/instra.png", alt: "Instagram" },
                  { src: "/x.png", alt: "X" },
                  { src: "/in.png", alt: "LinkedIn" },
                ].map((s) => (
                  <Link key={s.alt} href="#">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 border border-white/15 hover:bg-[#71AC16]/30 transition">
                      <Image src={s.src} alt={s.alt} width={16} height={16} className="object-contain" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
