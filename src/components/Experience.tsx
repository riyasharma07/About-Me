import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Briefcase, Calendar, MapPin, ChevronDown, ExternalLink } from 'lucide-react';
import { experiences } from '../data/portfolio';

export default function Experience() {
  const { ref, inView } = useInView(0.1);
  const [expandedProject, setExpandedProject] = useState<string | null>('Distributor Management System (DMS)');

  return (
    <section id="experience" className="section-padding relative">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref}>
          {/* Section header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-neon-green/20 text-neon-green text-xs font-mono mb-4"
            >
              <Briefcase size={12} />
              Work Experience
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-black text-white"
            >
              Where I've{' '}
              <span className="gradient-text">Shipped</span>
            </motion.h2>
          </div>

          {experiences.map((exp, ei) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + ei * 0.1, duration: 0.7 }}
              className="relative"
            >
              {/* Company header */}
              <div className="glass rounded-2xl p-6 border border-white/5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Company logo placeholder */}
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/20 flex items-center justify-center text-2xl font-black text-neon-cyan">
                        FA
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-green border-2 border-dark-900" title="Currently employed" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{exp.company}</h3>
                      <div className="text-neon-cyan font-semibold">{exp.role}</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1.5 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar size={13} />
                      <span className="font-mono">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MapPin size={13} />
                      {exp.location}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-medium">
                      {exp.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-4 pl-0 lg:pl-8">
                {exp.projects.map((project, pi) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + pi * 0.15 }}
                  >
                    {/* Project card header */}
                    <button
                      onClick={() =>
                        setExpandedProject(
                          expandedProject === project.name ? null : project.name
                        )
                      }
                      className="w-full glass rounded-2xl p-5 border border-white/5 hover:border-neon-cyan/20 transition-all duration-300 text-left group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3">
                            <ExternalLink size={14} className="text-neon-cyan shrink-0" />
                            <h4 className="text-white font-bold text-lg truncate">{project.name}</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-0.5 rounded-md bg-neon-cyan/8 border border-neon-cyan/15 text-neon-cyan text-xs font-mono"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedProject === project.name ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-slate-400 group-hover:text-neon-cyan transition-colors shrink-0 mt-1"
                        >
                          <ChevronDown size={20} />
                        </motion.div>
                      </div>
                    </button>

                    {/* Expanded highlights */}
                    <AnimatePresence>
                      {expandedProject === project.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="grid sm:grid-cols-2 gap-3 p-3 pt-2">
                            {project.highlights.map((h, hi) => (
                              <motion.div
                                key={h.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: hi * 0.06 }}
                                className="glass rounded-xl p-4 border border-white/5 hover:border-neon-cyan/15 transition-all duration-200 card-glow group"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="text-xl mt-0.5 shrink-0">{h.icon}</span>
                                  <div>
                                    <div className="text-sm font-semibold text-white mb-1 group-hover:text-neon-cyan transition-colors">
                                      {h.title}
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">{h.desc}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
