/**
 * A set of functions called "actions" for `dashboard-summary`
 */

export default {
    getSummary: async (ctx) => {
        try {
            const [
                totalProducts,
                totalCategories,
                totalSubscribers,
                totalRequests,
                requestsPending,
                requestsConfirmed,
                requestsInProgress,
                requestsCompleted,
                requestsCancelled,
            ] = await Promise.all([
                strapi.documents("api::product.product").count({
                    status: "published",
                }),
                strapi.documents("api::category.category").count({
                    status: "published",
                }),
                strapi.documents("api::subscriber.subscriber").count({
                    status: "published",
                }),
                strapi.documents("api::request.request").count({
                    status: "published",
                }),
                strapi.documents("api::request.request").count({
                    status: "published",
                    filters: {
                        requestStatus: "pending",
                    },
                }),
                strapi.documents("api::request.request").count({
                    status: "published",
                    filters: {
                        requestStatus: "confirmed",
                    },
                }),
                strapi.documents("api::request.request").count({
                    status: "published",
                    filters: {
                        requestStatus: "in_progress",
                    },
                }),
                strapi.documents("api::request.request").count({
                    status: "published",
                    filters: {
                        requestStatus: "completed",
                    },
                }),
                strapi.documents("api::request.request").count({
                    status: "published",
                    filters: {
                        requestStatus: "cancelled",
                    },
                }),
            ]);

            ctx.body = {
                data: {
                    totalProducts,
                    totalCategories,
                    totalSubscribers,
                    totalRequests,
                    requests: {
                        requestsPending,
                        requestsConfirmed,
                        requestsInProgress,
                        requestsCompleted,
                        requestsCancelled,
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
