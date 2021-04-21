import i18n from 'i18n-js';

import en from './en.json';
import de from './de.json';
import fr from './fr.json';

i18n.locale = 'en';
i18n.fallbacks = true;
i18n.translations = {en, de, fr};

export default i18n;
