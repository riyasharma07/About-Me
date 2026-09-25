import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { MapPin, Mail, Phone, User } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo, techStack } from '../data/portfolio';

const categoryColors: Record<string, string> = {
  lang: 'border-blue-400/30 text-blue-300 bg-blue-400/5',
  framework: 'border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5',
  db: 'border-purple-400/30 text-purple-300 bg-purple-400/5',
  devops: 'border-orange-400/30 text-orange-300 bg-orange-400/5',
  cloud: 'border-sky-400/30 text-sky-300 bg-sky-400/5',
  messaging: 'border-yellow-400/30 text-yellow-300 bg-yellow-400/5',
  ai: 'border-neon-purple/30 text-neon-purple bg-neon-purple/5',
  monitoring: 'border-green-400/30 text-green-300 bg-green-400/5',
  tools: 'border-slate-400/30 text-slate-300 bg-slate-400/5',
};

export default function About() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-neon-cyan/20 text-neon-cyan text-xs font-mono mb-4"
            >
              <User size={12} />
              About Me
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              The Person Behind the{' '}
              <span className="gradient-text">Code</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left – bio and contact */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="space-y-6"
            >
              {/* Avatar placeholder */}
              <div className="relative w-36 h-36 mx-auto lg:mx-0">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-white/10 flex items-center justify-center text-6xl select-none">
                  👩‍💻
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple opacity-20 blur-md -z-10" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -right-3 -top-3 w-7 h-7 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-xs text-dark-900 font-bold shadow-neon-cyan"
                >
                  RS
                </motion.div>
              </div>

              <div className="space-y-4">
                <p className="text-slate-300 text-lg leading-relaxed">
                  I'm a <span className="text-neon-cyan font-semibold">Software Development Engineer - 2</span> with 4+ years of experience building high-throughput backend systems at{' '}
                  <span className="text-white font-semibold">FieldAssist</span>. My work powers a Distributor Management System serving{' '}
                  <span className="text-neon-purple font-semibold">85,000+ daily active users</span> at 800+ RPS.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  I specialize in microservices architecture with NestJS, cloud infrastructure on Azure & Kubernetes, and lately I've been diving deep into AI-powered systems — building LLM agents, RAG pipelines, and intelligent decision-automation workflows using GPT-4.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-3 pt-2">
                {[
                  { icon: MapPin, text: personalInfo.location, color: 'text-neon-cyan' },
                  { icon: Mail, text: personalInfo.email, href: `mailto:${personalInfo.email}`, color: 'text-neon-purple' },
                  { icon: Phone, text: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: 'text-neon-green' },
                ].map(({ icon: Icon, text, href, color }) => (
                  <div key={text} className="flex items-center gap-3 text-sm">
                    <div className={`w-8 h-8 rounded-lg glass flex items-center justify-center ${color}`}>
                      <Icon size={14} />
                    </div>
                    {href ? (
                      <a href={href} className="text-slate-300 hover:text-white transition-colors">{text}</a>
                    ) : (
                      <span className="text-slate-300">{text}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Social buttons */}
              <div className="flex gap-3 pt-2">
                <motion.a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 hover:border-neon-cyan/30 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200"
                >
                  <GithubIcon size={16} />
                  GitHub
                </motion.a>
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 hover:border-blue-400/30 text-slate-300 hover:text-blue-300 text-sm font-medium transition-all duration-200"
                >
                  <LinkedinIcon size={16} />
                  LinkedIn
                </motion.a>
              </div>
            </motion.div>

            {/* Right – tech stack */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h3 className="text-lg font-semibold text-white mb-5">
                Full Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.04, type: 'spring', stiffness: 120 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium cursor-default transition-all duration-200 ${categoryColors[tech.category] || 'border-white/10 text-slate-400'}`}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>

              {/* Key highlights box */}
              <div className="mt-8 glass rounded-2xl p-6 border border-white/5">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Key Achievements</h4>
                <div className="space-y-3">
                  {[
                    { emoji: '⚡', text: 'Reduced API latency by 70% (5s → 800ms)' },
                    { emoji: '📊', text: '90% improvement in reporting performance' },
                    { emoji: '🔧', text: '100K+ records per batch async processing' },
                    { emoji: '🤖', text: 'Built AI agents with GPT-4 & RAG pipelines' },
                    { emoji: '☁️', text: 'Production Kubernetes with HPA auto-scaling' },
                  ].map(({ emoji, text }, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <span className="text-base">{emoji}</span>
                      <span>{text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
