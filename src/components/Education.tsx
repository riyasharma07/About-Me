import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { education } from '../data/portfolio';

export default function Education() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="education" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref}>
          {/* Section header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-400/20 text-blue-300 text-xs font-mono mb-4"
            >
              <GraduationCap size={12} />
              Education
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-black text-white"
            >
              My{' '}
              <span className="gradient-text">Foundation</span>
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
                className="relative"
              >
                <div className="glass rounded-2xl p-8 border border-white/5 hover:border-blue-400/20 transition-all duration-300 group card-glow">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    {/* Icon */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400/20 to-neon-cyan/20 border border-blue-400/20 flex items-center justify-center">
                        <GraduationCap size={28} className="text-blue-300" />
                      </div>
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-400/10 to-neon-cyan/10 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex-1">
                      {/* Institution */}
                      <h3 className="text-2xl font-black text-white mb-1 group-hover:text-blue-200 transition-colors">
                        {edu.institution}
                      </h3>
                      <div className="text-blue-300 font-semibold mb-4">
                        {edu.degree} · {edu.field}
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-5">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-neon-cyan" />
                          <span className="font-mono">{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-neon-cyan" />
                          {edu.location}
                        </div>
                      </div>

                      {/* Grade */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-400/10 to-neon-cyan/10 border border-blue-400/20">
                        <Award size={16} className="text-blue-300" />
                        <span className="text-white font-semibold">Grade: </span>
                        <span className="text-2xl font-black gradient-text-cyan-purple">{edu.grade}</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative */}
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {['Data Structures', 'Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'Software Engineering', 'Object-Oriented Programming'].map((subj) => (
                        <span
                          key={subj}
                          className="px-2.5 py-1 rounded-lg bg-white/3 border border-white/5 text-slate-500 text-xs font-mono"
                        >
                          {subj}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
