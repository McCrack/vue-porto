/* eslint-disable no-useless-escape */

export default class ValidRules {
	static #len(value) {
		return String(value).length;
	}
	// eslint-disable-next-line no-dupe-class-members
	static #req(value) {
		return !!String(value).length;
	}
	// eslint-disable-next-line no-dupe-class-members
	static #regex(value, expr) {
		return !ValidRules.#req(value) || expr.test(value);
	}

	minLength(value, length) {
		return !ValidRules.#req(value) || ValidRules.#len(value) >= length;
	}

	maxLength(value, length) {
		return !ValidRules.#req(value) || ValidRules.#len(value) <= length;
	}

	maxValue(value, max) {
		return +value <= +max;
	}

	emptyField(value) {
		return value.length > 0
	}

	minValue(value, max) {
		return +value >= +max;
	}

	alpha(value) {
		return ValidRules.#regex(value, /^[a-zA-Z]*$/);
	}
	include(value, arr) {
		return arr.includes(value);
	}
	includeUpper(value) {
		return ValidRules.#regex(value, /[A-Z]/);
	}
	includeLower(value) {
		return ValidRules.#regex(value, /[a-z]/);
	}
	includeSymbols(value) {
		return ValidRules.#regex(value, /[$-/:-?{-~!"^_`\[\]]/);
	}

	decimal(value) {
		return ValidRules.#regex(value, /^[-]?\d*(\.\d+)?$/);
	}

	domain(value) {
		return ValidRules.#regex(value, /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/);
	}

	alphaNum(value) {
		return ValidRules.#regex(value, /^[a-zA-Z0-9]*$/);
	}

	integer(value) {
		return ValidRules.#regex(value, /(^[0-9]*$)|(^-[0-9]+$)/);
	}

	numeric(value) {
		return ValidRules.#regex(value, /^[0-9]*$/);
	}
	sameAs(value, equalTo) {
		return value == equalTo;
	}

	require(value) {
		if (typeof value === "string") {
			return ValidRules.#req(value.trim());
		}
		return ValidRules.#req(value);
	}

	email(value) {
		const emailRegex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
		return ValidRules.#regex(value, emailRegex);
	}
	urlCheck(value) {
		const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
		return ValidRules.#regex(value, urlRegex);
	}
	phone(value) {
		const phoneRegex = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
		return ValidRules.#regex(value, phoneRegex);
	}
	fullDate(value) {
		const dateRegex = /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/;
		return ValidRules.#regex(value, dateRegex);
	}
	monthDate(value) {
		const monthRegex = /^(0?[1-9]|1[0-2])$/;
		return ValidRules.#regex(value, monthRegex);
	}
	dayDate(value) {
		const dayRegex = /^(0?[1-9]|[12][0-9]|3[01])$/;
		return ValidRules.#regex(value, dayRegex);
	}
	ip(value) {
		const ipRegex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
		return ValidRules.#regex(value, ipRegex);
	}
	numberCard(value) {
		const cardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
		return ValidRules.#regex(value, cardRegex);
	}
	password(value) {
		const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
		return ValidRules.#regex(value, passwordRegex)
	}
}