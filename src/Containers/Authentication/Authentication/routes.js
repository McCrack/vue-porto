export default [
    {
        path: "/sign-in",
        name: "SignIn",
        component: () => import("@/Containers/Authentication/Authentication/View"),
    },
    {
        path: "/sign-up",
        name: "SignUp",
        component: () => import("@/Containers/Authentication/Authentication/View"),
    },
    {
        path: "/reset-password",
        name: "ResetPassword",
        component: () => import("@/Containers/Authentication/Authentication/View"),
    },
];