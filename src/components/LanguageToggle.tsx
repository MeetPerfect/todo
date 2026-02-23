import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../i18n';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  // Simple language indicator - could be enhanced with flag icons
  const languageLabel = language === 'zh' ? '中文' : 'EN';

  return (
    <button
      onClick={toggleLanguage}
      className="language-toggle"
      aria-label={t(language === 'zh' ? 'appTitle' : 'appTitle', language === 'zh' ? 'en' : 'zh')}
      title={language === 'zh' ? 'Switch to English' : '切换到中文'}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '8px 12px',
        backgroundColor: '#9c27b0',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}
    >
      {languageLabel}
    </button>
  );
};

export default LanguageToggle;