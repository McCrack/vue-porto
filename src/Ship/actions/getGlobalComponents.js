import {camelCase, upperFirst} from "lodash";

const requireComponents = require.context('../components/global', true, /[\w-]+\.vue$/);

export default () => {
    const componentList = {};
    requireComponents.keys().forEach(fileName => {
        const componentConfig = requireComponents(fileName);
        const componentName = upperFirst(
            camelCase(fileName.split('/').pop().replace(/\.\w+$/, ''))
        );
        componentList[componentName] = componentConfig.default || componentConfig;
    });

    return componentList
}
