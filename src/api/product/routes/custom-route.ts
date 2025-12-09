export default {
    routes: [
        {
            method: "GET",
            path: "/products/:slug",
            handler: "product.findOne",
        },
        {
            method: "DELETE",
            path: "/products/:slug",
            handler: "product.delete",
        },
    ],
};
