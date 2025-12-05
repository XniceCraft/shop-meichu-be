/**
 * A set of functions called "actions" for `dashboard-summary`
 */

export default {
    getSummary: async (ctx) => {
        try {
            const [
                totalProducts,
                totalCategories,
                orderPending,
                orderConfirmed,
                orderInProgress,
                orderCompleted,
                orderCancelled,
            ] = await Promise.all([
                strapi.documents("api::product.product").count({
                    status: "published",
                }),
                strapi.documents("api::category.category").count({
                    status: "published",
                }),
                strapi.documents("api::order.order").count({
                    filters: { orderStatus: { $eq: "pending" } },
                }),
                strapi.documents("api::order.order").count({
                    filters: { orderStatus: { $eq: "confirmed" } },
                }),
                strapi.documents("api::order.order").count({
                    filters: { orderStatus: { $eq: "in_progress" } },
                }),
                strapi.documents("api::order.order").count({
                    filters: { orderStatus: { $eq: "completed" } },
                }),
                strapi.documents("api::order.order").count({
                    filters: { orderStatus: { $eq: "cancelled" } },
                }),
            ]);

            ctx.body = {
                data: {
                    totalProducts,
                    totalCategories,
                    orderStatus: {
                        pending: orderPending,
                        confirmed: orderConfirmed,
                        inProgress: orderInProgress,
                        completed: orderCompleted,
                        cancelled: orderCancelled,
                    },
                },
                meta: {},
            };
        } catch (err) {
            ctx.body = {
                error: "An error occurred while fetching the summary data",
                details: err instanceof Error ? err.message : "Unknown error",
            };
            ctx.status = 500;
        }
    },
};
