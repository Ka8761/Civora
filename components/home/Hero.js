import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedHeroText from './AnimatedHeroText';

export default function Hero() {
  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">

  {/* Huge Background Text */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
    <h1 className="hero-bg-text animate-pulse">
      CIVORA
    </h1>
  </div>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60 z-10"></div>

  {/* Hero Content */}
  <div className="relative z-20 text-center px-6">
    <AnimatedHeroText />
  </div>

</section>
  );
}
