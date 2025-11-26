export default {
    routes: [
        {
            method: "GET",
            path: "/dashboard-summary",
            handler: "api::dashboard-summary.dashboard-summary.getSummary",
        },
    ],
};
