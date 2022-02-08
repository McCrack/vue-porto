//import {useAuthenticationTasks} from '@/Containers/Authentication/Authentication'

//const {deleteToken} = useAuthenticationTasks();


export default {
    apiErrors: {
        401: (error) => {
//            deleteToken();
            console.log(`ERROR: ${error.message}`);
        },

        422: (error) => {
            console.log(`ERROR: ${error.message}`);
        },
        default: {}
    },

    webSocketErrors: {
        default: {}
    }

}
