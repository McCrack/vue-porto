
import { ErrorManager } from '@/Ship';
const { apiErrors } = ErrorManager;

let STACK = [];
let BUSY = false;

const resolveStack = () => {
	if (!BUSY && STACK.length) {
		BUSY = true;
		const task = STACK.shift();
		task();
	} else {
		BUSY = false;
	}
}

export default {
	push: (task) => {
		const promise = new Promise((resolve, reject) => {
			STACK.push(() => {
				(task())
					.then(response => {
						resolve(response);
						setTimeout(() => {
							BUSY = false;
							resolveStack();
						}, 50);
					})
					.catch((error) => {
						apiErrors[error.response?.status]?.(error.response.data);
						resolveStack();
						reject(error);
					});
			});
		});
		resolveStack();
		return promise;
	}
}
