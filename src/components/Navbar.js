"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">

      {/* ═══════════════════════════════════════
          DESKTOP NAV (md+) — 100% UNCHANGED
      ═══════════════════════════════════════ */}
      <nav className="hidden md:flex justify-between z-50">
        <div className="flex">
          <div>
            <Link href="/" className="">
              <Image
                src="/menu-button-left.png"
                alt="Logo"
                width={126}
                height={126}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <div className="ml-14 mt-6">
            <div
              className={`flex items-center max-w-[787px] bg-black border-[3px] border-white rounded-full px-5 py-4 transition-all duration-300 ${
                isScrolled ? "shadow-2xl" : ""
              }`}
            >
              <div className="hidden md:flex items-center justify-between gap-7">
                <div className="flex ml-14 gap-x-19">
                  {["Home", "Our gym location"].map((link) => (
                    <Link
                      key={link}
                      href={`/#${link.toLowerCase().replace(/ /g, "-")}`}
                      className="text-white hover:text-white text-[24px] font-medium transition-colors whitespace-nowrap"
                    >
                      {link}
                    </Link>
                  ))}
                </div>
                <div className="w-[2px] h-[23px] mx-14 bg-white/60" />
                <div className="flex items-center bg-white/25 rounded-full px-8 py-4 gap-2">
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent w-full text-white placeholder:text-white/70 text-[22px] outline-none"
                  />
                  <button className="text-white hover:text-gray-300 transition-colors">
                    <i className="fas fa-search text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center shrink-0">
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <button className="bg-[#71AC16] text-white font-black text-[35px] uppercase tracking-widest w-full py-[26px] px-[71px] flex flex-1 rounded-full transition-all duration-200">
                  Profile
                </button>
              </Link>
              <button
                onClick={logout}
                className="border border-white/20 text-white/70 hover:text-white font-semibold text-sm px-4 py-3 rounded-full transition-all duration-200"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <Link href="/login">
              <motion.button className="bg-[#71AC16] text-white font-black text-[35px] uppercase tracking-widest w-full py-[26px] px-[71px] flex flex-1 rounded-full transition-all duration-200">
                Register
              </motion.button>
            </Link>
          )}
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          MOBILE NAV (below md) — custom design
      ═══════════════════════════════════════ */}
      <nav className="md:hidden flex items-center justify-between px-4 py-3 relative z-50">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/menu-button-left.png"
            alt="Logo"
            width={68}
            height={68}
            className="object-contain"
            priority
          />
        </Link>

        {/* Right: Register pill + animated hamburger */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/profile">
              <button className="bg-[#71AC16] text-white font-black text-[12px] uppercase tracking-widest py-2 px-4 rounded-full">
                Profile
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="bg-[#71AC16] text-white font-black text-[12px] uppercase tracking-widest py-2 px-4 rounded-full">
                Register
              </button>
            </Link>
          )}

          {/* Animated 3-bar hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-black/50 border border-white/25 rounded-xl backdrop-blur-sm"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="block w-5 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[2px] bg-white rounded-full"
            />
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          MOBILE SLIDE-IN DRAWER
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dim backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/65 backdrop-blur-[2px] z-40"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="md:hidden fixed top-0 right-0 h-full w-[275px] bg-[#0a0a0a] z-50 flex flex-col overflow-hidden"
            >
              {/* Green accent strip */}
              <div className="h-1 w-full bg-[#71AC16]" />

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/menu-button-left.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/8 text-white/60 hover:text-white hover:bg-white/15 transition"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>

              {/* Search */}
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-3 bg-white/6 border border-white/10 rounded-xl px-4 py-3">
                  <i className="fas fa-search text-[#71AC16] text-sm"></i>
                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="bg-transparent text-white placeholder:text-white/35 text-[14px] outline-none w-full"
                  />
                </div>
              </div>

              {/* Navigation links */}
              <div className="flex flex-col px-4 py-2 flex-1">
                <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-bold px-2 mb-2">
                  Menu
                </p>
                {[
                  { label: "Home", icon: "fa-home", href: "/#home" },
                  { label: "Our Gym Location", icon: "fa-map-marker-alt", href: "/#our-gym-location" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.08 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center gap-3 px-3 py-3.5 rounded-xl hover:bg-white/6 transition mb-1"
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/6 group-hover:bg-[#71AC16]/20 transition">
                        <i className={`fas ${item.icon} text-[#71AC16] text-xs`}></i>
                      </span>
                      <span className="text-white/80 group-hover:text-white text-[15px] font-medium flex-1 transition">
                        {item.label}
                      </span>
                      <i className="fas fa-chevron-right text-[9px] text-white/20 group-hover:text-white/50 transition"></i>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <div className="px-5 pb-4 border-t border-white/8 pt-4">
                <p className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-bold mb-3">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {[
                    { src: "/facebook.png", alt: "Facebook" },
                    { src: "/instra.png", alt: "Instagram" },
                    { src: "/x.png", alt: "X" },
                    { src: "/in.png", alt: "LinkedIn" },
                  ].map((s) => (
                    <Link key={s.alt} href="#">
                      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/8 hover:bg-[#71AC16]/25 border border-white/10 transition">
                        <Image src={s.src} alt={s.alt} width={16} height={16} className="object-contain" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA button */}
              <div className="px-5 pb-7">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full bg-[#71AC16] hover:bg-[#5d9010] text-white font-black text-[13px] uppercase tracking-widest py-3.5 rounded-xl transition">
                        My Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className="w-full border border-white/15 text-white/50 hover:text-white text-[13px] py-3 rounded-xl transition"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full bg-[#71AC16] hover:bg-[#5d9010] text-white font-black text-[13px] uppercase tracking-widest py-3.5 rounded-xl transition">
                      Register Now
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}