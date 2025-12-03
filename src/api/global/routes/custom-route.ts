export default {
    routes: [
        {
            method: "GET",
            path: "/global/footer",
            handler: "global.getFooter",
        },
        {
            method: "GET",
            path: "/global/navbar",
            handler: "global.getNavbar",
        },
    ],
};
