import { useAuthenticationActions } from '@/Containers/Authentication/Authentication'
const { signIn } = useAuthenticationActions();

import {
	STACK,
	ApiClient,
} from "@/Ship";

export default (user) => {

	//if (valid) {
	return new Promise((resolve) => {
		STACK.push(() => {
			return ApiClient.post('/register', user);  // '/register ', user
		}).then(() => {
			signIn({ email: user.email, password: user.password }).then(() => resolve()); // after /register login 
			// todo After Sign Up action
		});
	});

	//}
}
