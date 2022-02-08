import axios from 'axios';
import { createI18n } from "vue-i18n";
const defaultLocale = process.env.VUE_APP_DEFAULT_LOCALE;

const i18n = createI18n({
    legacy: true,
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    messages: {},
})

i18n.supportLocales = ['en','ru'];
i18n.loadedLanguages = [];

function setI18nLanguage(locale) {
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale;
    } else {
        i18n.global.locale.value = locale;
    }
    axios.defaults.headers.common['Accept-Language'] = locale;
    document.querySelector('html').setAttribute('lang', locale);
}

i18n.selectLocale = (locale) => {
	if(i18n.loadedLanguages.includes(locale)){
		if (i18n.locale !== locale){
			setI18nLanguage(locale)
			return Promise.resolve();
		}
	}
    const dictionary = require(`./../assets/dictionaries/${locale}.json`);
    // return axios.get(`/ui/${locale}`).then(response => {
	// 	const dictionaries = response.data;
    i18n.global.setLocaleMessage(locale, dictionary);
	i18n.loadedLanguages.push(locale);
	setI18nLanguage(locale);
	// });
}

export default i18n;
