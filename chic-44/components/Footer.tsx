import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const FooterColumn: React.FC<{ title: string; links: {key: string, label: string}[] }> = ({ title, links }) => (
  <div>
    <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4">{title}</h3>
    <ul>
      {links.map((link) => (
        <li key={link.key} className="mb-2">
          <a href="#" className="text-gray-400 hover:text-white hover:underline text-sm">{link.label}</a>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: React.FC = () => {
    const { t } = useTranslation();

  const socialLinks = ['Instagram','TikTok'].map(s => ({key: s.toLowerCase(), label: s}));
  const aboutLinks = [
      { key: 'contact', label: t('footer_contact') },
      { key: 'company', label: t('footer_company') },
      { key: 'work', label: t('footer_work_with_us') },
      { key: 'stores', label: t('footer_our_stores') }
  ];
  const infoLinks = [
      { key: 'terms', label: t('footer_terms') },
      { key: 'warranties', label: t('footer_warranties') },
      { key: 'service', label: t('footer_customer_service') },
      { key: 'data', label: t('footer_data_policy') }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterColumn title={t('footer_social')} links={socialLinks} />
          <FooterColumn title={t('footer_about')} links={aboutLinks} />
          <FooterColumn title={t('footer_info')} links={infoLinks} />
          <div/>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-xs">
            {t('footer_copyright').replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};