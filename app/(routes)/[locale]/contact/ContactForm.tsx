'use client';

/**
 * Contact Form Client Component
 * Handles form state and submission
 * Loaded dynamically to reduce initial bundle
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Send } from 'lucide-react';
import { Card } from '@/app/components/Card';

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

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fade-in">
            <Card className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm sm:text-base font-medium text-white/80 mb-2">
                      {t('form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-white/5 border border-white/10 text-white text-base placeholder-white/40 focus:border-gold/50 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm sm:text-base font-medium text-white/80 mb-2">
                      {t('form.title')}
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-white/5 border border-white/10 text-white text-base placeholder-white/40 focus:border-gold/50 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm sm:text-base font-medium text-white/80 mb-2">
                      {t('form.company')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-white/5 border border-white/10 text-white text-base placeholder-white/40 focus:border-gold/50 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm sm:text-base font-medium text-white/80 mb-2">
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-white/5 border border-white/10 text-white text-base placeholder-white/40 focus:border-gold/50 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm sm:text-base font-medium text-white/80 mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-lg bg-white/5 border border-white/10 text-white text-base placeholder-white/40 focus:border-gold/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 animate-fade-in">
                    {t('form.success')}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 animate-fade-in">
                    {t('form.error')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-semibold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                      {t('form.submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </form>
            </Card>
          </div>

          {/* Contact Information - Only one email */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card gradient className="p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                {t('info.title')}
              </h3>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <div className="text-sm sm:text-base text-white/60 mb-2">
                    {t('info.emailLabel')}
                  </div>
                  <a
                    href={`mailto:${t('info.email')}`}
                    className="text-white text-base sm:text-lg hover:text-gold transition-colors font-medium"
                  >
                    {t('info.email')}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 bg-gradient-to-br from-gold/20 to-gold/5 border-gold/30">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3">
                {t('sidebar.mvpStatus')}
              </h3>
              <p className="text-white/70 text-sm sm:text-base mb-4 leading-relaxed">
                {t('sidebar.mvpDetails')}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
