import { createApp } from "vue";
import VueAxios from "vue-axios";
import Vue3TouchEvents from "vue3-touch-events";

import '@assets/css/normalize.css';
import '@assets/css/c-bble.css';

//setTimeout(() => import('@assets/themes/main.css'), 1000)

import {
    i18n,
    STATE,
    Router,
    RootView,
    ApiClient,
    useShipActions,
} from "./Ship";

const app = createApp(RootView)
    .use(Router)
    .use(i18n)
    .use(Vue3TouchEvents)
    .use(VueAxios, ApiClient);

Router.isReady().then(() => {
    i18n.selectLocale(i18n.global.locale);

    const {
        checkToken,
        getGlobalComponents
    } = useShipActions();

    checkToken();

    /*~~~~~ Registering global components ~~~~~*/

    const componentList = getGlobalComponents();
    for (let componentName in componentList) {
        app.component(componentName, componentList[componentName]);
    }

    /*~~~~~ Visibility Observer ~~~~~*/
    document.addEventListener("visibilitychange", function() {
        STATE.IS_VISIBLE = document.visibilityState === "visible";
    });

    app.mount("#app");
});
