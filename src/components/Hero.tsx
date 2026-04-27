import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowDown, Sparkles, Zap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolio';

const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    const current = texts[currentIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText.length + 1 === current.length) {
          setSpeed(2000);
          setIsDeleting(true);
        } else {
          setSpeed(100);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
          setSpeed(400);
        } else {
          setSpeed(50);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, texts, speed]);

  return (
    <span className="gradient-text-cyan-purple font-bold">
      {displayText}
      <span className="animate-blink text-neon-cyan ml-0.5">|</span>
    </span>
  );
};

const FloatingBadge = ({
  label, x, y, delay
}: { label: string; x: string; y: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 100 }}
    style={{ left: x, top: y }}
    className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10 text-xs font-mono text-slate-300"
    whileHover={{ scale: 1.1, borderColor: 'rgba(0,245,255,0.4)' }}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
    {label}
  </motion.div>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(191,90,242,0.3) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(48,209,88,0.15) 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating tech badges */}
      <FloatingBadge label="NestJS" x="8%" y="20%" delay={1.2} />
      <FloatingBadge label="Kubernetes" x="80%" y="15%" delay={1.5} />
      <FloatingBadge label="GPT-4 / RAG" x="85%" y="70%" delay={1.8} />
      <FloatingBadge label="Redis Cache" x="5%" y="75%" delay={2.0} />
      <FloatingBadge label="800+ RPS" x="75%" y="40%" delay={2.2} />
      <FloatingBadge label="TypeScript" x="10%" y="45%" delay={2.4} />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-cyan/20 text-sm text-neon-cyan mb-8"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span className="font-mono">Available for new opportunities</span>
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4">
            <span className="text-white">Hi, I'm </span>
            <span className="gradient-text">Riya</span>
            <span className="text-white"> Sharma</span>
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 h-12"
        >
          <TypewriterText texts={personalInfo.roles} />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10"
        >
          {personalInfo.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
              className="glass rounded-xl p-3 border border-white/5 hover:border-neon-cyan/20 transition-all duration-300"
            >
              <div className="text-2xl font-black gradient-text-cyan-purple">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-900 font-bold text-sm transition-all duration-300 hover:shadow-neon-cyan"
          >
            <Zap size={16} className="group-hover:animate-spin" />
            View My Work
          </motion.button>
          <motion.a
            href="mailto:official5riyasharma@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-white/10 hover:border-neon-cyan/30 text-white font-semibold text-sm transition-all duration-300"
          >
            <Mail size={16} />
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
            { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
            { icon: Phone, href: `tel:${personalInfo.phone}`, label: 'Phone' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              title={label}
              className="w-11 h-11 rounded-xl glass border border-white/10 hover:border-neon-cyan/30 flex items-center justify-center text-slate-400 hover:text-neon-cyan transition-all duration-200 hover:shadow-neon-cyan"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-neon-cyan transition-colors"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
