import {
	STACK,
	ApiClient,
} from "@/Ship";

export default function (resetData) {
	STACK.push(() => {
		return ApiClient.post('/password/forgot/confirm', resetData);
	});
}