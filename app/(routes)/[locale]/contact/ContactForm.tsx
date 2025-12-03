'use client';

/**
 * Contact Form Client Component
 * Soft edges, smooth transitions
 * Loaded dynamically to reduce initial bundle
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Send } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { cn } from '@/lib/utils';
import { AnimatedWrapper, AnimatedCard } from '@/app/components/motion/AnimatedWrapper';

export function ContactForm() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    title: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          title: '',
          message: ''
        });

        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Soft input styles
  const inputStyles = cn(
    "w-full px-5 py-4 rounded-2xl",
    "bg-white/[0.02] backdrop-blur-sm",
    "border border-white/[0.06]",
    "text-white text-base placeholder-white/25",
    "focus:border-gold/25 focus:bg-white/[0.04]",
    "focus:outline-none focus:ring-2 focus:ring-gold/10"
  );

  const labelStyles = cn(
    "block text-sm sm:text-base font-medium",
    "text-white/60 mb-2.5"
  );

  return (
    <section className="section-premium section-no-fade relative">
      <div className="container-premium">
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <AnimatedWrapper animation="fadeUp" className="lg:col-span-2">
            <Card variant="soft" size="xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label htmlFor="name" className={labelStyles}>
                      {t('form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputStyles}
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className={labelStyles}>
                      {t('form.title')}
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={inputStyles}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label htmlFor="company" className={labelStyles}>
                      {t('form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputStyles}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelStyles}>
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputStyles}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelStyles}>
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={cn(inputStyles, "resize-none")}
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className={cn(
                    "p-5 rounded-2xl",
                    "bg-green-500/[0.08] border border-green-500/[0.15]",
                    "text-green-400/90 text-sm sm:text-base"
                  )}>
                    {t('form.success')}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={cn(
                    "p-5 rounded-2xl",
                    "bg-red-500/[0.08] border border-red-500/[0.15]",
                    "text-red-400/90 text-sm sm:text-base"
                  )}>
                    {t('form.error')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full inline-flex items-center justify-center gap-2.5",
                    "px-8 py-5 rounded-full",
                    "bg-gradient-to-r from-gold/95 to-gold-light/95 text-black",
                    "font-semibold text-base sm:text-lg",
                    "shadow-[0_4px_24px_-4px_rgba(212,175,55,0.3)]",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      {t('form.submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </form>
            </Card>
          </AnimatedWrapper>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card variant="soft" size="lg">
              <h3 className={cn(
                "font-display font-semibold text-white",
                "text-lg sm:text-xl",
                "mb-5 sm:mb-6"
              )}>
                {t('info.title')}
              </h3>

              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex-shrink-0",
                  "bg-gradient-to-br from-gold/15 to-gold/5",
                  "border border-gold/10",
                  "flex items-center justify-center"
                )}>
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                </div>
                <div>
                  <div className="text-sm text-white/45 mb-1.5">
                    {t('info.emailLabel')}
                  </div>
                  <a
                    href={`mailto:${t('info.email')}`}
                    className={cn(
                      "text-white text-base sm:text-lg font-medium",
                      "hover:text-gold/80"
                    )}
                  >
                    {t('info.email')}
                  </a>
                </div>
              </div>
            </Card>

            <Card variant="soft" size="lg" className="!border-gold/[0.1]">
              <h3 className={cn(
                "font-display font-semibold text-white",
                "text-base sm:text-lg",
                "mb-3"
              )}>
                {t('sidebar.mvpStatus')}
              </h3>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                {t('sidebar.mvpDetails')}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
