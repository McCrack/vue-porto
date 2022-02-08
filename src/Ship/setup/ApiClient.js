import axios from "axios";
//import { useAuthenticationActions } from "@/Containers/Authentication/Authentication";
//const { refreshToken } = useAuthenticationActions();

axios.defaults.baseURL = '/api/';

Object.defineProperty(axios.__proto__, "isTokenExpired", {
	value: false,
	writable: true,
});

Object.defineProperty(axios.__proto__, "expiresIn", {
	get() {
		return (sessionStorage.expires_in || 0) - Date.now();
	}
});

axios.__proto__.setToken = (token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axios.__proto__.checkToken = () => {
	if (sessionStorage.access_token && (sessionStorage.expires_in - axios.expiresIn) > 180000) {
		axios.setToken(sessionStorage.access_token);
		axios.isTokenExpired = false;
	}
}

axios.__proto__.removeToken = () => {
	delete axios.defaults.headers.common["Authorization"];
}

axios.interceptors.request.use(config => {
	if (sessionStorage.access_token && axios.expiresIn > 0) {
		if (!axios.isTokenExpired && axios.expiresIn < 180000) {
			axios.isTokenExpired = true;
//			refreshToken();
		}
	}
	return config;
});

export default axios;
