export default {
    routes: [
        {
            method: "POST",
            path: "/orders/new",
            handler: "order.userCreateOrder",
        },
    ],
};
