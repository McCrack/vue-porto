import componentLoader from "@/Ship/core/ComponentLoader";
import actionLoader from "@/Ship/core/ActionLoader";
import tasksLoader from "@/Ship/core/TasksLoader";


export function useAuthenticationActions() {
    const requireActions = require.context('./actions', true, /[\w-]+\.js$/);
    return actionLoader(requireActions);
}

export function useAuthenticationTasks() {
    const requireComponents = require.context('./tasks', true, /[\w-]+\.js$/);
    return tasksLoader(requireComponents);
}

export function useAuthenticationComponents() {
    const requireComponents = require.context('./components', true, /[\w-]+\.vue$/);
    return componentLoader(requireComponents);
}

export default require("./View").default;
