export default {
    routes: [
        {
            method: "DELETE",
            path: "/requests/:id/soft-delete",
            handler: "request.softDelete",
        },
        {
            method: "POST",
            path: "/requests/:id/cancel",
            handler: "request.cancelRequest",
        },
        {
            method: "POST",
            path: "/requests/:id/next-action",
            handler: "request.nextAction",
        },
    ],
};
