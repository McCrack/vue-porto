export default function(requireActions) {
    let actionList = {};
    requireActions.keys().forEach(fileName => {
        const actionName = fileName.split('/').pop().replace(/\.popup\.\w+$/, '');
        actionList[actionName] = requireActions(fileName).default;
    });
    return actionList;
}

