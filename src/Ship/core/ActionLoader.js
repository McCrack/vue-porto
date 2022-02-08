export default function(requireActions) {
    let actionList = {};
    requireActions.keys().forEach(fileName => {
        const actionName = fileName.split('/').pop().replace(/\.\w+$/, '');
        actionList[actionName] = requireActions(fileName).default;
    });
    return actionList;
}