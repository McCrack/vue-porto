import { ApiClient } from "@/Ship";
//import { useAuthenticationActions } from "@/Containers/Authentication/Authentication";
//import { useProfileResources } from "@/Containers/Profile/Profile";

export default function () {
    if (sessionStorage.access_token) {
//        const { Profile } = useProfileResources();
//        const profile = Profile.getInstance();
        if (ApiClient.expiresIn > 180000) {
            ApiClient.setToken(sessionStorage.access_token);
//            profile.reload();
        } else {
            ApiClient.isTokenExpired = true;
//            const { refreshToken } = useAuthenticationActions();
//            refreshToken().then(() => {
//                profile.reload();
//            })
        }
    }
}
