import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { Mail, ArrowUpRight, Copy, Check, Github, Send, ShieldCheck, Heart } from 'lucide-react';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const { setIsAdminView } = useNotifications();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Brand Identity & Design');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const myEmail = 'abdullahpsychotic@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopiedEmail(true);
    onShowToast('Email copied to clipboard: ' + myEmail);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onShowToast('Message prepared! Opening email client...');
      window.location.href = `mailto:${myEmail}?subject=${encodeURIComponent(
        `Project Inquiry: ${service} from ${name}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`)}`;
      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#111522] dark:bg-[#070a12] text-white relative overflow-hidden transition-colors">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#3946f4]/20 dark:from-[#3946f4]/30 via-transparent to-transparent rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Contact Info (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8b92a1] inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Have a Project in Mind?</span>
            </span>

            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              Let’s make something <em className="font-serif italic font-normal text-[#6873ff] dark:text-[#818cf8]">worth remembering.</em>
            </h2>

            <p className="text-sm sm:text-base text-[#a3abbd] leading-relaxed max-w-lg">
              Whether you need an original brand identity, a lightning-fast responsive web app, an applied AI tool, or custom typography — I am currently accepting selected projects while continuing my diploma.
            </p>

            {/* Email pill with copy button */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-white/50 block font-bold mb-2">
                Direct Contact Email
              </span>
              <div className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 p-2 pr-4 rounded-2xl backdrop-blur-md transition-all">
                <a
                  href={`mailto:${myEmail}`}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-[#6873ff] transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#3946f4] text-white flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{myEmail}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs font-bold text-white/70">
              <a
                href="https://github.com/forhad-psychotic"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span>·</span>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Behance</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span>·</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span>·</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Quick Inquiry Form (6 cols) */}
          <div className="lg:col-span-6 bg-white/[0.04] dark:bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[32px] p-6 sm:p-8">
            <h3 className="font-heading font-extrabold text-xl text-white mb-1">
              Send a Quick Message
            </h3>
            <p className="text-xs text-white/60 mb-5">
              I typically respond within 12 to 24 hours.
            </p>

            <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 font-bold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#3946f4] focus:ring-1 focus:ring-[#3946f4]"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#3946f4] focus:ring-1 focus:ring-[#3946f4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">
                  Required Discipline / Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a2033] dark:bg-[#131929] border border-white/15 text-white focus:outline-none focus:border-[#3946f4]"
                >
                  <option value="Brand Identity & Design">Brand Identity & Visual System</option>
                  <option value="Full-Stack Web Development">Responsive Web Development (React)</option>
                  <option value="AI Integration & Generative System">AI Generative System & Creative Tech</option>
                  <option value="Typography & Editorial">Custom Typography & Editorial Layout</option>
                  <option value="General Consultation">General Inquiry / Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 font-bold mb-1">
                  Project Brief or Idea *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your brand, goals, timeline, or links to references..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#3946f4] focus:ring-1 focus:ring-[#3946f4]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#3946f4] to-[#8b5cf6] hover:from-[#2834d6] hover:to-[#7c3aed] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-[#3946f4]/30 hover:shadow-[#3946f4]/50 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending...' : 'Send Inquiry to Abdullah'}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Footer info & Admin secret entrance */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © 2026 Abdullah Forhad · Graphic Designer, Web Developer & AI Technologist.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminView(true)}
              className="inline-flex items-center gap-1 text-white/50 hover:text-amber-400 transition-colors cursor-pointer text-[11px]"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Abdullah's Private Management Portal</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
