/* EXAMPLE DATA
		const orders = new Orders();
		const autoSaveForm = new AutoSaveForm();

		let timeout = null;

		orders.state = [ <- EXAMPLE Forms Data
			{
				name: "Sd",
				middleName: "sdsd",
				secondName: "",
			},
			{
				name: "OO",
				middleName: "OOO",
				secondName: "",
			},
		];
		orders.index = 0; // orders.model = orders.state[0]

		watch(
			() => orders.entry,
			() => {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					autoSaveForm.push(orders);
					autoSaveForm.push(orders);
				}, 1000);
			},
			{ deep: true }
		);
*/

import _ from 'lodash';
import { STATE } from "@/Ship";
import { watch, ref } from 'vue';

import { useShipActions } from '@/Ship';
const { filterObject } = useShipActions();

export default class AutoSaveForm {
	stack = ref([]);
	uniqData = {}; //accum all updated value,
	timeout = null;

	static #instance = null;

	constructor() {
		if (!AutoSaveForm.#instance) {
			AutoSaveForm.#instance = this;

			watch(() => this.stack, (curStack) => {
				if (Object.keys(curStack.value).length > 0) {
					this.resolveStack();
				}
			});
		}
		return AutoSaveForm.#instance;
	}

	static getInstance() {
		return new AutoSaveForm();
	}

	resolveStack() {
		clearTimeout(this.timeout);

		this.timeout = setTimeout(() => {
			new Promise(() => {
				this.stack.value.forEach((resource) => {
					resource.save(this.uniqData);
					this.uniqData = {}; // clear updated input
				});
			}).then(() => {
				STATE.AUTO_SAVE = true;
			});

			this.stack.value = [];

			STATE.AUTO_SAVE = false;

		}, 1000);
	}


	push(resource) {
		let timeout = null;
		watch(
			() => _.cloneDeep(resource.model),
			(curEntry, prevEntry) => {
				clearTimeout(timeout);
				
				this.uniqData = { ...this.uniqData, ...filterObject(resource.model, (key) => curEntry[key] == prevEntry[key]) }; // ACUM All updated input
				this.uniqData = filterObject(this.uniqData, (key) => !!resource.validator?.form?.[key]); // Filter not Valid Field
				this.uniqData = filterObject(this.uniqData, (key) => resource.staticInput?.includes(key)); // Filter static input

					
				if (Object.keys(this.uniqData).length) {
					timeout = setTimeout(() => {
						if (!this.stack.value.includes(resource)) {
							this.stack.value.push(resource);
							this.resolveStack();
						}
					}, 1000);
				}
			},
			{ deep: true }
		);

	}
}