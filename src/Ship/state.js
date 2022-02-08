import { reactive } from "vue";

const STATE = reactive({
    LOADING: false,
    IS_LOGIN: false,
    IS_VISIBLE: true,
    AUTO_SAVE: true,
    POPUP: {
        SHOW: false,
        NAME: '',
        PROPS: null,
    }
});

export default STATE;
