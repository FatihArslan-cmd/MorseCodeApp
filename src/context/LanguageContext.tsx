import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import translation files
import en from '../../assets/lang/en.json';
import zh from '../../assets/lang/zh.json';
import hi from '../../assets/lang/hi.json';
import es from '../../assets/lang/es.json';
import fr from '../../assets/lang/fr.json';
import ar from '../../assets/lang/ar.json';
import bn from '../../assets/lang/bn.json';
import ru from '../../assets/lang/ru.json';
import pt from '../../assets/lang/pt.json';
import ur from '../../assets/lang/ur.json';
import id from '../../assets/lang/id.json';
import de from '../../assets/lang/de.json';
import ja from '../../assets/lang/ja.json';
import mr from '../../assets/lang/mr.json';
import te from '../../assets/lang/te.json';
import tr from '../../assets/lang/tr.json';
import ta from '../../assets/lang/ta.json';
import yue from '../../assets/lang/yue.json'; // Cantonese
import vi from '../../assets/lang/vi.json';
import ko from '../../assets/lang/ko.json';
import it from '../../assets/lang/it.json';
import pl from '../../assets/lang/pl.json';
import uk from '../../assets/lang/uk.json';
import nl from '../../assets/lang/nl.json';
import fil from '../../assets/lang/fil.json'; // Tagalog
import fa from '../../assets/lang/fa.json';
import ro from '../../assets/lang/ro.json';
import th from '../../assets/lang/th.json';
import gu from '../../assets/lang/gu.json';
import kn from '../../assets/lang/kn.json';
import ml from '../../assets/lang/ml.json';
import or from '../../assets/lang/or.json';
import my from '../../assets/lang/my.json';
import pa from '../../assets/lang/pa.json';
import uz from '../../assets/lang/uz.json';
import si from '../../assets/lang/si.json';
import az from '../../assets/lang/az.json';
import el from '../../assets/lang/el.json';
import hu from '../../assets/lang/hu.json';
import cs from '../../assets/lang/cs.json';
import sv from '../../assets/lang/sv.json';
import da from '../../assets/lang/da.json';
import sk from '../../assets/lang/sk.json';
import fi from '../../assets/lang/fi.json';
import no from '../../assets/lang/no.json';
import he from '../../assets/lang/he.json';
import kk from '../../assets/lang/kk.json';
import ne from '../../assets/lang/ne.json';
import sr from '../../assets/lang/sr.json';

// Define type for translation resources
type Resources = {
  translation: {
    [key: string]: string;
  };
};

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en } as Resources,
      zh: { translation: zh } as Resources,
      hi: { translation: hi } as Resources,
      es: { translation: es } as Resources,
      fr: { translation: fr } as Resources,
      ar: { translation: ar } as Resources,
      bn: { translation: bn } as Resources,
      ru: { translation: ru } as Resources,
      pt: { translation: pt } as Resources,
      ur: { translation: ur } as Resources,
      id: { translation: id } as Resources,
      de: { translation: de } as Resources,
      ja: { translation: ja } as Resources,
      mr: { translation: mr } as Resources,
      te: { translation: te } as Resources,
      tr: { translation: tr } as Resources,
      ta: { translation: ta } as Resources,
      yue: { translation: yue } as Resources, // Cantonese
      vi: { translation: vi } as Resources,
      ko: { translation: ko } as Resources,
      it: { translation: it } as Resources,
      pl: { translation: pl } as Resources,
      uk: { translation: uk } as Resources,
      nl: { translation: nl } as Resources,
      fil: { translation: fil } as Resources, // Tagalog
      fa: { translation: fa } as Resources,
      ro: { translation: ro } as Resources,
      th: { translation: th } as Resources,
      gu: { translation: gu } as Resources,
      kn: { translation: kn } as Resources,
      ml: { translation: ml } as Resources,
      or: { translation: or } as Resources,
      my: { translation: my } as Resources,
      pa: { translation: pa } as Resources,
      uz: { translation: uz } as Resources,
      si: { translation: si } as Resources,
      az: { translation: az } as Resources,
      el: { translation: el } as Resources,
      hu: { translation: hu } as Resources,
      cs: { translation: cs } as Resources,
      sv: { translation: sv } as Resources,
      da: { translation: da } as Resources,
      sk: { translation: sk } as Resources,
      fi: { translation: fi } as Resources,
      no: { translation: no } as Resources,
      he: { translation: he } as Resources,
      kk: { translation: kk } as Resources,
      ne: { translation: ne } as Resources,
      sr: { translation: sr } as Resources,
    },
    fallbackLng: 'en',
    debug: true,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

// Define type for LanguageContext
interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
}

// Define type for LanguageProvider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Create language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// LanguageProvider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en'); // Varsayılan olarak İngilizce

  useEffect(() => {
    const fetchSelectedLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
          setCurrentLanguage(selectedLanguage);
          i18next.changeLanguage(selectedLanguage);
        } else {
          const deviceLanguage = Localization.locale.split('-')[0]; // Sadece dil kodunu al
          if (Object.keys(i18next.services.resourceStore.data).includes(deviceLanguage)) {
            setCurrentLanguage(deviceLanguage);
            i18next.changeLanguage(deviceLanguage);
          }
        }
      } catch (error) {
        console.error('Error fetching selected language:', error);
      }
    };

    fetchSelectedLanguage();
  }, []);

  const changeLanguage = async (lang: string) => {
    if (lang === currentLanguage) {
      return;
    }
    try {
      await AsyncStorage.setItem('selectedLanguage', lang);
      i18next.changeLanguage(lang);
      setCurrentLanguage(lang);
    } catch (error) {
      console.error('Error setting selected language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using LanguageContext
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;