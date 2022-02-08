import { useAuthenticationTasks, /*useAuthenticationActions*/ } from '@/Containers/Authentication/Authentication';
const { saveToken } = useAuthenticationTasks();
//const { reloadProfile } = useAuthenticationActions()
import { STATE } from "@/Ship";

import {
	STACK,
	ApiClient,
} from "@/Ship";


export default event => {
	const {
		email,
		password,
	} = event.target;

	return new Promise((resolve, reject) => {
		STACK.push(() => ApiClient.post('/login', {
			email: email.value,
			password: password.value
		})).then(({ data }) => {
			saveToken(data);
			//reloadProfile();
			STATE.IS_LOGIN = true;
			resolve();
		}).catch(err => {
			reject(err)
		});
	})
}
