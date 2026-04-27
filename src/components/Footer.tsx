import { motion } from 'framer-motion';
import { Mail, Code2, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolio';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-dark-800/50">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-neon-purple/30" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
              <Code2 size={18} className="text-dark-900" />
            </div>
            <span className="font-bold text-lg gradient-text-cyan-purple">
              Riya<span className="text-white">.</span>dev
            </span>
          </motion.div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
            { icon: GithubIcon, href: personalInfo.github },
            { icon: LinkedinIcon, href: personalInfo.linkedin },
              { icon: Mail, href: `mailto:${personalInfo.email}` },
            ].map(({ icon: Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-lg glass border border-white/8 hover:border-neon-cyan/25 flex items-center justify-center text-slate-500 hover:text-neon-cyan transition-all duration-200"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-slate-600 text-sm flex items-center justify-center gap-1.5 flex-wrap">
            <span>© {new Date().getFullYear()} Riya Sharma.</span>
            <span>Built with</span>
            <Heart size={12} className="text-red-400 fill-red-400 animate-pulse" />
            <span>using React, TypeScript & Framer Motion.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
