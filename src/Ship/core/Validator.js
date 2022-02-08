import { watch } from "vue";
import _ from 'lodash';

/*
EXAMPLE DATA
const rules = reactive([
	{
		name: "name",
		value: toRef(orders.model, "name"),
		rules: {
			minLength: 8,
			decimal: true,
		},
	},
]);

const validator = new Validator(rules);
*/

import { ValidRules, useShipActions} from '@/Ship/';
const { filterObject } = useShipActions();

class ValidatorFields extends ValidRules {
	constructor(rulesForm) {
		super();
		this.rules = rulesForm
		this.form = {};

		watch(() => _.cloneDeep(rulesForm), (curForm, prevForm) => {
			const [changedInput] = curForm.filter((rule, index) => rule.value !== prevForm[index].value); //filter not updated input

			if(changedInput){
				this.updateValid(changedInput);
			}
		});
	}

	updateValid(field) {
		const validateField = this.#callAllRules(field); //get all validation fields false/ valueValid

		const nonValid = filterObject(validateField, (key) => validateField[key] == false);

		this.form[field.name] = Object.keys(nonValid).length ? nonValid : false;
	}

	#callAllRules(field) {
		return Object.entries(field.rules).reduce((acc, [key, value]) => {
			const checked = super[key]?.(field.value, value);
			acc[key] = checked ? !checked : value //if passed validation, changes the value to false or messageError
			return acc;
		}, {});
	}

	get allValid() {
		return Object.values(this.form).every((valid) => valid === false);
	}
}


export default ValidatorFields