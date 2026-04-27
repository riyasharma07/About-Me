import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Code2, Database, Cloud, Cpu } from 'lucide-react';
import { skills } from '../data/portfolio';

const SkillBar = ({
  name, level, delay, inView
}: { name: string; level: number; delay: number; inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay, duration: 0.5 }}
    className="group"
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
        {name}
      </span>
      <span className="text-xs font-mono text-neon-cyan">{level}%</span>
    </div>
    <div className="h-2 bg-dark-500/50 rounded-full overflow-hidden border border-white/5">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : {}}
        transition={{ delay: delay + 0.3, duration: 1, ease: 'easeOut' }}
        className="h-full rounded-full skill-bar-fill relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
      </motion.div>
    </div>
  </motion.div>
);

const categories = [
  {
    key: 'languages' as const,
    label: 'Languages & Runtime',
    icon: Code2,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    glow: 'hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]',
  },
  {
    key: 'frameworks' as const,
    label: 'Frameworks & Infra',
    icon: Cpu,
    color: 'text-neon-cyan',
    bg: 'bg-neon-cyan/10',
    border: 'border-neon-cyan/20',
    glow: 'hover:shadow-[0_0_20px_rgba(0,245,255,0.15)]',
  },
  {
    key: 'databases' as const,
    label: 'Databases & Cache',
    icon: Database,
    color: 'text-neon-purple',
    bg: 'bg-neon-purple/10',
    border: 'border-neon-purple/20',
    glow: 'hover:shadow-[0_0_20px_rgba(191,90,242,0.15)]',
  },
  {
    key: 'cloudAI' as const,
    label: 'Cloud, AI & Messaging',
    icon: Cloud,
    color: 'text-neon-green',
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/20',
    glow: 'hover:shadow-[0_0_20px_rgba(48,209,88,0.15)]',
  },
];

export default function Skills() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="skills" className="section-padding relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #00f5ff, transparent)' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #bf5af2, transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref}>
          {/* Section header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-neon-purple/20 text-neon-purple text-xs font-mono mb-4"
            >
              <Code2 size={12} />
              Technical Skills
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-black text-white"
            >
              My{' '}
              <span className="gradient-text">Arsenal</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-slate-500 mt-3 max-w-xl mx-auto"
            >
              Technologies I've mastered building production systems at scale
            </motion.p>
          </div>

          {/* Skill cards grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((cat, ci) => {
              const Icon = cat.icon;
              const data = skills[cat.key];
              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: ci * 0.12, duration: 0.6 }}
                  className={`glass rounded-2xl p-6 border ${cat.border} transition-all duration-300 ${cat.glow}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl ${cat.bg} ${cat.border} border flex items-center justify-center ${cat.color}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-semibold text-white">{cat.label}</h3>
                  </div>
                  <div className="space-y-4">
                    {data.map((skill, si) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        delay={ci * 0.12 + si * 0.08}
                        inView={inView}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Radial skill visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 glass rounded-2xl p-8 border border-white/5 text-center"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Core Competencies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Microservices', color: 'from-neon-cyan to-blue-500' },
                { label: 'High-Throughput Systems', color: 'from-neon-purple to-pink-500' },
                { label: 'API Performance', color: 'from-neon-green to-teal-500' },
                { label: 'LLM / AI Engineering', color: 'from-orange-400 to-yellow-500' },
                { label: 'Cloud Architecture', color: 'from-blue-400 to-cyan-400' },
                { label: 'DevOps & CI/CD', color: 'from-pink-400 to-rose-500' },
                { label: 'Distributed Systems', color: 'from-violet-400 to-purple-500' },
                { label: 'Database Optimization', color: 'from-emerald-400 to-green-500' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.06, type: 'spring' }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="relative group cursor-default"
                >
                  <div className={`px-5 py-2 rounded-full bg-gradient-to-r ${item.color} text-dark-900 text-sm font-semibold`}>
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
