import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send } from 'lucide-react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// Set VITE_IRIS_API_URL to your Vercel deployment, e.g. https://riya-iris.vercel.app/api/iris
const API_URL = import.meta.env.VITE_IRIS_API_URL ?? '/api/iris';

const GREETING: ChatMessage = {
  role: 'assistant',
  content: "Hi, I'm Iris ✨ Ask me anything about Riya — her experience, projects, or skills.",
};

const SUGGESTIONS = [
  'What does Riya work on?',
  'What has she built with AI?',
  'What are her strongest skills?',
  'How can I contact her?',
];

export default function Iris() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || loading) return;

    // The greeting is UI-only; don't send it to the model.
    const history = [...messages.slice(1), { role: 'user' as const, content: text }];
    setMessages([GREETING, ...history, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);

    const setReply = (content: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content }]);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setReply(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      // Read the streamed answer chunk by chunk so it "types" in.
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setReply(reply);
      }
    } catch {
      setReply("I couldn't reach my brain just now. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Close Iris chat' : 'Ask Iris about Riya'}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple text-dark-900 font-bold shadow-lg shadow-neon-cyan/20"
      >
        {open ? <X size={18} /> : <Sparkles size={18} />}
        <span className="hidden sm:inline">{open ? 'Close' : 'Ask Iris'}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 z-50 h-[70vh] max-h-[560px] flex flex-col rounded-2xl bg-dark-800/95 backdrop-blur-xl border border-neon-cyan/20 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-purple/30 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="text-white font-bold leading-tight">Iris</div>
                <div className="text-xs text-slate-400">AI assistant · answers about Riya</div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-neon-cyan/15 border border-neon-cyan/20 text-white rounded-br-sm'
                        : 'bg-white/5 border border-white/5 text-slate-200 rounded-bl-sm'
                    }`}
                  >
                    {m.content || <span className="text-slate-500 animate-pulse">Iris is thinking…</span>}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      className="px-3 py-1.5 rounded-full text-xs border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 p-3 border-t border-white/5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={800}
                placeholder="Ask about Riya…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-neon-cyan/40"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="p-2.5 rounded-xl bg-neon-cyan/15 border border-neon-cyan/30 text-neon-cyan disabled:opacity-40 hover:bg-neon-cyan/25 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
