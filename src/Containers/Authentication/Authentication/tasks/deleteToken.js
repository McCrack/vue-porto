import {
	ApiClient,
} from "@/Ship";

export default function () {
	sessionStorage.removeItem('access_token');
	sessionStorage.removeItem('refresh_token');
	sessionStorage.removeItem('expires_in');

	ApiClient.removeToken();
}