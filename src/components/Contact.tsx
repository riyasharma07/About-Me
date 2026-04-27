import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolio';

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      const subject = encodeURIComponent(form.subject || 'Portfolio Contact');
      const body = encodeURIComponent(`Hi Riya,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, #bf5af2, transparent)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, delay: 5 }}
          className="absolute top-0 left-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, #00f5ff, transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref}>
          {/* Header */}
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-neon-cyan/20 text-neon-cyan text-xs font-mono mb-4"
            >
              <MessageCircle size={12} />
              Get in Touch
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-black text-white"
            >
              Let's{' '}
              <span className="gradient-text">Connect</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-slate-500 mt-3 max-w-md mx-auto"
            >
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left info panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact cards */}
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: personalInfo.email,
                  href: `mailto:${personalInfo.email}`,
                  color: 'text-neon-cyan',
                  bg: 'bg-neon-cyan/10',
                  border: 'border-neon-cyan/20',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: personalInfo.phone,
                  href: `tel:${personalInfo.phone}`,
                  color: 'text-neon-purple',
                  bg: 'bg-neon-purple/10',
                  border: 'border-neon-purple/20',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: personalInfo.location,
                  href: undefined,
                  color: 'text-neon-green',
                  bg: 'bg-neon-green/10',
                  border: 'border-neon-green/20',
                },
              ].map(({ icon: Icon, label, value, href, color, bg, border }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={`glass rounded-xl p-4 border ${border} flex items-center gap-4 hover:scale-[1.02] transition-transform duration-200`}
                >
                  <div className={`w-10 h-10 rounded-lg ${bg} ${border} border flex items-center justify-center ${color} shrink-0`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-sm text-slate-200 hover:text-white transition-colors break-all">
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-200">{value}</span>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="glass rounded-xl p-5 border border-white/5"
              >
                <p className="text-sm text-slate-400 mb-4">Find me online</p>
                <div className="flex gap-3">
                  {[
                    { icon: GithubIcon, href: personalInfo.github, label: 'GitHub', color: 'hover:text-white hover:border-white/30' },
                    { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400/30' },
                    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email', color: 'hover:text-neon-cyan hover:border-neon-cyan/30' },
                  ].map(({ icon: Icon, href, label, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      title={label}
                      className={`w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-200 ${color}`}
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="glass rounded-2xl p-8 border border-white/5 relative overflow-hidden">
                {/* Top gradient */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/40 to-neon-purple/40" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-neon-green/20 border border-neon-green/30 flex items-center justify-center">
                      <CheckCircle size={32} className="text-neon-green" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                    <p className="text-slate-400 text-center text-sm max-w-xs">
                      Your email client should have opened. I'll get back to you as soon as possible!
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                      className="mt-2 px-5 py-2 rounded-lg glass border border-white/10 hover:border-neon-cyan/20 text-sm text-slate-400 hover:text-white transition-all"
                    >
                      Send another
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {(['name', 'email'] as const).map((field) => (
                        <div key={field}>
                          <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">
                            {field === 'name' ? 'Your Name' : 'Email Address'}
                          </label>
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            name={field}
                            value={form[field]}
                            onChange={handleChange}
                            required
                            placeholder={field === 'name' ? 'John Doe' : 'john@example.com'}
                            className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-neon-cyan/40 focus:bg-white/5 transition-all duration-200"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Job opportunity / Project collaboration..."
                        className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-neon-cyan/40 focus:bg-white/5 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell me about your project or opportunity..."
                        className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-neon-cyan/40 focus:bg-white/5 transition-all duration-200 resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-900 font-bold text-sm transition-all duration-200 hover:shadow-neon-cyan disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-dark-900/30 border-t-dark-900 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
