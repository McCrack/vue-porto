import { createRouter, createWebHistory } from "vue-router";

const requireRoutes = require.context("@/Containers/", true, /routes\.js$/);

const findAllRelation = (rootPath, allPath) => {
    return rootPath.map((root) => {
        const rootChildren = (allPath, root) => { // Find all child for root section
            return allPath.reduce((acc, cur) => {
                if (root.parent == cur.parent && root.child !== cur.child) {
                    acc.push(cur);
                }
                return acc;
            }, []);
        }

        return {
            path: root.path,
            children: rootChildren(allPath, root),
        };
    });
}

const requireAllRoutes = (reletionFile) => {

    return reletionFile.map(route=>{
        const componentConfig = requireRoutes(route.path);

        if (route.children.length) { //Checking for the existence of children
            componentConfig.default[0].children = route.children
                .map((file) => requireRoutes(file.path).default)
                .flat(); //require wrap in an array
        }

        return componentConfig.default;
    }).flat() //webpack "require" wrap in an array
}

const splitFileName = (path) => {
    const parseUrl = path.split("/"); //Replace with regEx
    return { parent: parseUrl[1], child: parseUrl[2], path };
};

const satisfyRoot = (parent, child) => parent === child; //Satisfy for root section

const routesArr = requireRoutes.keys().map((routes) => splitFileName(routes)); //Split all path
const sectionRoot = routesArr.filter((path) => { //Filter root section
    return satisfyRoot(path.parent, path.child);
});

const relationAllFile = findAllRelation(sectionRoot, routesArr);

const routes = requireAllRoutes(relationAllFile);

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});


// router.beforeEach((to, from, next) => {   if url contain /ru or /en
// 	const lang = to.params.lang;
// 	i18n.loadLanguageAsync(lang).then(() => next())
// });

export default router;
