import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Setting = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const language = i18n.language || 'en';

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('sCMMS.settings.title')}</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            {t('sCMMS.settings.language')}
          </label>
          <div className="relative">
            <button
              type="button"
              className={`flex items-center py-2 px-3 rounded-lg border text-blue-900 border-gray-300 bg-gray-50 text-sm font-medium focus:outline-none min-w-[120px]`}
              onClick={() => setLangDropdownOpen(open => !open)}
              aria-haspopup="listbox"
              aria-expanded={langDropdownOpen}
            >
              <img
                src={
                  language === 'en'
                    ? '/flag_en_icon.svg'
                    : language === 'vi'
                      ? '/flag_vn_icon.svg'
                      : '/flag_jp_icon.svg'
                }
                alt={language}
                className="mr-2 h-5 w-6 object-cover align-middle"
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              />
              {language === 'en' && t('sCMMS.settings.en')}
              {language === 'vi' && t('sCMMS.settings.vi')}
              <span className="ml-2 flex items-center justify-center h-5">
                <svg
                  className="w-5 h-5 text-gray-400 align-middle"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {langDropdownOpen && (
              <ul
                className="absolute left-0 mt-2 min-w-[110px] text-blue-900 bg-white/90 border text-sm border-gray-200 rounded-sm shadow-lg z-50"
                role="listbox"
              >
                <li
                  className={`flex items-center px-3 py-2 cursor-pointer hover:bg-blue-100 ${language === 'en' ? 'font-bold' : ''}`}
                  onClick={() => handleChangeLanguage('en')}
                  role="option"
                  aria-selected={language === 'en'}
                >
                  <img src={'/flag_en_icon.svg'} className="mr-2 h-5 w-5" alt="English" />{' '}
                  {t('sCMMS.settings.en')}
                </li>
                <li
                  className={`flex items-center px-3 py-2 cursor-pointer hover:bg-blue-100 ${language === 'vi' ? 'font-bold' : ''}`}
                  onClick={() => handleChangeLanguage('vi')}
                  role="option"
                  aria-selected={language === 'vi'}
                >
                  <img src={'/flag_vn_icon.svg'} className="mr-2 h-5 w-5" alt="Tiếng Việt" />{' '}
                  {t('sCMMS.settings.vi')}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
