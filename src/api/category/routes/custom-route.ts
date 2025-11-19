export default {
    routes: [
        {
            method: "GET",
            path: "/categories/:slug",
            handler: "category.findOne",
            config: {
                auth: false,
            },
        },
        {
            method: "GET",
            path: "/categories/:slug/products",
            handler: "category.getProducts",
            config: {
                auth: false,
            },
        },
    ],
};
