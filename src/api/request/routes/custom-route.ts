export default {
    routes: [
        {
            method: "DELETE",
            path: "/requests/:slug/soft-delete",
            handler: "request.softDelete",
        },
    ],
};
