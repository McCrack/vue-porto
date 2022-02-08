import { ApiClient } from "@/Ship";

export default function (data) {
	ApiClient.isTokenExpired = false;

	sessionStorage.access_token = data.access_token;
	sessionStorage.refresh_token = data.refresh_token;
	sessionStorage.expires_in = Date.now() + data.expires_in * 1000;

	ApiClient.setToken(data.access_token);
}