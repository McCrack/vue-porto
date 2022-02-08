import {
	ref,
	reactive,
	toRef,
} from "vue";

import {
	STACK,
	ApiClient,
	Validator,
	useShipActions,
} from "@/Ship";

const { preLoader } = useShipActions();
export default class BaseResource {
	idx = ref(null);
	entry = reactive({});
	collection = ref([]);
	LOADING = ref(false);

	constructor() {
		this.model = new Proxy(this.entry, {
			get: (target, key) => {
				// return key in this.entry && !Array.isArray(this.entry[key])
				return key in this.entry
					? this.entry[key]
				  	: this.collection.value[this.idx.value]?.[key] || '';
			},
			set: (target, key, value) => {
				this.entry[key] = value;
				return true;
			}
		});
	}

	set index(value) {
		this.idx.value = Number.isInteger(value) ? value : null;
	}

	get index() {
		return this.idx.value;
	}

	get state() {
		return this.collection.value;
	}

	set state(data) {
		this.collection.value = data;
	}

	get entry() {
		return this.entry;
	}

	get current() {
		if ((this.idx.value || this.idx.value === 0) && this.collection.value.length > 0) {
			return this.item(this.idx.value);
		} else {
			return null;
		}
	}

	item(index) {
		return Number.isInteger(index) && index < this.collection.value.length
			? this.collection.value[index]
			: null;
	}

	updateCollectionItem(item) {
		if (this.item(this.idx.value) && item) {
			Object.assign(this.item(this.idx.value), item);
		} else console.log('The error occurred during update collection item!');
	}

	Validator(rules) {
		return new Validator(rules);
	}

	get(filters={}) {
		const { showPreLoader, setDuration } = preLoader(toRef(this,'LOADING'), new Date());

		return STACK.push(() => {
			showPreLoader();
			return ApiClient.get(this.endpoint, filters)
				.then(setDuration)
				.then(response => {
					this.collection.value = response.data.data;
					return response.data;
				});
		});
	}

	paginate(filters) {
		const { showPreLoader, setDuration } = preLoader(toRef(this,'LOADING'), new Date());

		return STACK.push(() => {
			showPreLoader();

			return ApiClient.get(this.endpoint, filters)
				.then(setDuration)
				.then(response => this.state = response.data)
		});
	}

	find(id, options = {}) {
		const { showPreLoader, setDuration } = preLoader(toRef(this,'LOADING'), new Date());
		return STACK.push(() => {
			showPreLoader();
			return ApiClient.get(`${this.endpoint}/${id}`, options).then(setDuration);
		});
	}

	save(customData = false, id) {
		const { showPreLoader, setDuration } = preLoader(toRef(this,'LOADING'), new Date());

		return STACK.push(() => {
			showPreLoader();

			return ApiClient.patch(`${this.endpoint}/${id}`, customData || this.entry).then(setDuration); //${this.collection[this.idx]['id']}
		});
	}

	create() {
		const { showPreLoader, setDuration } = preLoader(toRef(this,'LOADING'), new Date());

		return STACK.push(() => {
			showPreLoader();
			return ApiClient.post(this.endpoint, this.entry).then(setDuration);
		});
	}

	createOnSpecifiedPath(path, payload, options = null) {
		const { showPreLoader, setDuration } = preLoader(toRef(this,'LOADING'), new Date());

		return STACK.push(() => {
			showPreLoader();
			return ApiClient.post(`${this.endpoint}/${path}`, payload, options).then(setDuration);
		});
	}

	delete(id) {
		const { showPreLoader, setDuration } = preLoader(toRef(this,'LOADING'), new Date());

		return STACK.push(() => {
			showPreLoader();

			return ApiClient.delete(`${this.endpoint}/${id}`).then(setDuration);
		});
	}

	updateModel(key, value) {
		this.model[key] = ref(value);
	}

	clearEntry() {
		Object.keys(this.entry).forEach(key => delete this.entry[key])
	}

	clearValidator() {
		Object.keys(this.validator.form).forEach(key => delete this.validator.form[key])
	}

	setActiveIndex(index) {
		this.index = index
	}

	afterCreate(data) {
		if (data.id) {
			const index = this.state.push(data);
			this.index = index - 1;
		}
		this.clearEntry();
	}
}
