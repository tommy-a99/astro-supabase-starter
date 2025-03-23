import { en } from "./en";
import { ko } from "./ko";

export const languages = {
	en: 'English',
	ko: '한국어',
};

export const defaultLang = 'en';

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in languages) return lang;
	return defaultLang;
}

export function isDefaultLang(url: URL) {
	return getLangFromUrl(url) === defaultLang;
}

export function useTranslations(url: URL) {
	const defaultTranslations: any = en;
	let translations: any = en;
	const [, lang] = url.pathname.split("/");
	switch (lang) {
		case "ko":
			translations = ko;
			break;
		default:
			translations = en;
	}

	return function t(key: string): string {
		let value: any = translations;
		let defaultValue: any = defaultTranslations;

		const keys = key.split(".");
		for (const k of keys) {
			if (value && value[k] !== undefined) {
				value = value[k];
			}

			if (defaultValue && defaultValue[k] !== undefined) {
				defaultValue = defaultValue[k];
			}
		}

		if (typeof value === "string") {
			return value;
		}
		if (typeof defaultValue === "string") {
			return defaultValue;
		}

		return key;
	};
}
