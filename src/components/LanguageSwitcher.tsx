'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export default function LanguageSwitcher({ isScrolled }: { isScrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const switchLocale = (code: string) => {
    setIsOpen(false);
    // Use next-intl router to switch locale while preserving the current path
    router.replace(pathname, { locale: code });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`flex items-center gap-1.5 px-2 py-2 text-[13px] font-semibold tracking-wider transition-all duration-300 rounded-md hover:text-[#B78A42] ${
          isScrolled ? 'text-[#333333]' : 'text-white'
        }`}
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="hidden xl:inline">{locale.toUpperCase()}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 pt-2 z-[1001]"
          >
            <div className="bg-white/95 backdrop-blur-2xl shadow-2xl shadow-[#333333]/15 border border-[#B78A42]/10 rounded-2xl overflow-hidden w-[200px]">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-[#B78A42] to-transparent" />
              <div className="px-4 pt-3 pb-2">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B78A42]">Language</span>
              </div>
              <div className="px-2 pb-2 max-h-[50vh] overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                      lang.code === locale
                        ? 'bg-[#B78A42]/10 text-[#B78A42]'
                        : 'text-[#333333]/70 hover:bg-[#B78A42]/5 hover:text-[#B78A42]'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="text-[13px] font-medium tracking-wide">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
