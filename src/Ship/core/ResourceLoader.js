export default function(requireResources) {
    let resourceList = {};
    requireResources.keys().forEach(fileName => {
        const resourceName = fileName.split('/').pop().replace(/\.\w+$/, '');
        resourceList[resourceName] = requireResources(fileName).default;
    });
    return resourceList;
}