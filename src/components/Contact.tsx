import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Facebook, Check, Copy, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/photography';
import { MorphHeading } from './MorphText';
import { GenerateButton } from './GenerateButton';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Editorial & Commission',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Please provide details about your inquiry.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate realistic processing and prepare mailto prefill fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Construct mailto URL to ensure real delivery
      const subject = encodeURIComponent(`[Inquiry: ${formData.inquiryType}] from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
      );
      const mailtoUrl = `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;

      // Open mail client as genuine fallback
      window.location.href = mailtoUrl;
    }, 800);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#050505] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left Column: Direct Business Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-400">
                Inquiries & Bookings
              </p>
              <MorphHeading
                as="h2"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] mb-8"
              >
                Let’s Create Something Meaningful.
              </MorphHeading>

              <p className="text-neutral-400 font-light leading-relaxed mb-10 text-sm sm:text-base">
                Available for editorial assignments, private portraiture, and commercial
                commissions in New York and travel worldwide.
              </p>

              {/* Business Credentials & Direct Links */}
              <div className="space-y-6 border-t border-white/10 pt-8 text-sm">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-1">
                    Studio
                  </span>
                  <p className="text-white font-medium">{BUSINESS_INFO.name}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-1">
                    Location
                  </span>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <MapPin className="h-4 w-4 text-neutral-400" />
                    <span>{BUSINESS_INFO.location}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-1">
                    Direct Email
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="flex items-center gap-2 text-white hover:text-neutral-300 underline underline-offset-4 transition-colors font-mono text-xs sm:text-sm"
                      data-cursor="pointer"
                    >
                      <Mail className="h-4 w-4 text-neutral-400" />
                      <span>{BUSINESS_INFO.email}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1.5 text-neutral-400 hover:text-white rounded border border-white/10 hover:border-white/30 transition-colors"
                      title="Copy email address"
                      aria-label="Copy email address"
                      data-cursor="pointer"
                    >
                      {copiedEmail ? (
                        <Check className="h-3.5 w-3.5 text-white" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    {copiedEmail && (
                      <span className="text-[11px] text-neutral-400 animate-pulse font-mono">
                        Copied
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 block mb-1">
                    Social Presence
                  </span>
                  <a
                    href={BUSINESS_INFO.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors text-xs uppercase tracking-wider"
                    data-cursor="pointer"
                  >
                    <Facebook className="h-4 w-4" />
                    <span>Facebook Profile</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-sm border border-white/10 bg-black/60 p-8 sm:p-12 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white mb-6">
                    <Check className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-3xl font-light text-white">Inquiry Initiated</h3>
                  <p className="mx-auto max-w-md text-sm text-neutral-400 leading-relaxed">
                    Thank you, {formData.name}. Your email client should open automatically to
                    finalize dispatch. You can also reach out directly to{' '}
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="text-white underline">
                      {BUSINESS_INFO.email}
                    </a>
                    .
                  </p>
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          inquiryType: 'Editorial & Commission',
                          message: '',
                        });
                      }}
                      className="text-xs uppercase tracking-widest text-neutral-400 underline hover:text-white cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="e.g. Eleanor Vance"
                        className={`w-full rounded-sm border bg-black/50 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-white/15 focus:border-white'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="you@domain.com"
                        className={`w-full rounded-sm border bg-black/50 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-white/15 focus:border-white'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-2"
                    >
                      Inquiry Category
                    </label>
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full rounded-sm border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-white focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Editorial & Commission">Editorial & Fashion Commission</option>
                      <option value="Portrait Session">Intimate Portrait Session</option>
                      <option value="Commercial Campaign">Commercial Campaign</option>
                      <option value="Fine Art Print Inquiry">Fine Art Print Acquisition</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-2"
                    >
                      Project Details & Vision *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Tell us about the desired date, location, aesthetic direction, and scope..."
                      className={`w-full rounded-sm border bg-black/50 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors ${
                        errors.message
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-white/15 focus:border-white'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <GenerateButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                      showIcon={true}
                    >
                      {isSubmitting ? 'Preparing Inquiry...' : 'Send Message'}
                    </GenerateButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
