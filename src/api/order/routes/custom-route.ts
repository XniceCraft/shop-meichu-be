export default {
    routes: [
        {
            method: "POST",
            path: "/orders/new",
            handler: "order.userCreateOrder",
        },
        {
            method: "POST",
            path: "/orders/:id/cancel",
            handler: "order.cancelOrder",
        },
        {
            method: "POST",
            path: "/orders/:id/next-action",
            handler: "order.nextAction",
        },
    ],
};
