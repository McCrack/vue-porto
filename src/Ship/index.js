import actionLoader from "./core/ActionLoader";
import componentLoader from "./core/ComponentLoader";
//import tasksLoader from "./core/TasksLoader";
import popUpLoader from "./core/PopUpLoader";

function useShipActions() {
    const requireActions = require.context("./actions", true, /[\w-]+\.js$/);
    return actionLoader(requireActions);
}

// function useShipTasks() {
//     const requireTasks = require.context("./tasks", true, /[\w-]+\.js$/)
//     return tasksLoader(requireTasks)
// }

function useShipComponents() {
    const requireComponents = require.context(
        "./components",
        true,
        /[\w-]+\.vue$/
    );
    return componentLoader(requireComponents);
}

function usePopUpComponents() {
    const requirePopUp = require.context('@/', true, /[\w-]+\.popup\.vue$/);
    return popUpLoader(requirePopUp);
}

const Router = require("./router").default;
const i18n = require("./setup/Localization").default;
const ApiClient = require("./setup/ApiClient").default;
const ErrorManager = require("./core/ErrorManager").default;
const AutoSaveForm = require("./core/AutoSaveForm").default;
const ValidRules = require("./core/ValidRules").default;
const Validator = require("./core/Validator").default;
//const WebSockets = require("./core/WebSockets").default;
const STATE = require("./state").default;
const RootView = require("./App").default;
const STACK = require("./core/RequestStack").default;

export {
    i18n,
    STATE,
    STACK,
    Router,
    RootView,
    ApiClient,
    ValidRules,
    ErrorManager,
    //WebSockets,
    Validator,
    AutoSaveForm,
    //useShipTasks,
    useShipActions,
    useShipComponents,
    usePopUpComponents,
}
