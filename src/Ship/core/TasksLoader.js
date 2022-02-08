export default function(requireActions) {
    let tasksList = {};
    requireActions.keys().forEach(fileName => {
        const actionName = fileName.split('/').pop().replace(/\.\w+$/, '');
        tasksList[actionName] = requireActions(fileName).default;
    });
    return tasksList;
}