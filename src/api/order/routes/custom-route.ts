export default {
    routes: [
        {
            method: "POST",
            path: "/orders/new",
            handler: "order.userCreateOrder",
        },
        {
            method: "POST",
            path: "/orders/cancel/:documentId",
            handler: "order.cancelOrder",
        },
        {
            method: "POST",
            path: "/orders/next-action/:documentId",
            handler: "order.nextAction",
        },
    ],
};
