import {camelCase, upperFirst} from "lodash";

export default function(requireComponents) {
    let componentList = {};
    requireComponents.keys().forEach(fileName => {
        const componentConfig = requireComponents(fileName);
        const componentName = upperFirst(
            camelCase(fileName.split('/').pop().replace(/\.\w+$/, ''))
        );
        componentList[componentName] = componentConfig.default || componentConfig;
    });
    return componentList;
}