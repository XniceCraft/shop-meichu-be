/**
 * A set of functions called "actions" for `dashboard-summary`
 */

export default {
    getSummary: async (ctx) => {
        try {
            const [
                totalProducts,
                totalCategories,
                totalSubscriptions,
                totalRequests,
            ] = await Promise.all([
                strapi.documents("api::product.product").count({
                    status: "published",
                }),
                strapi.documents("api::category.category").count({
                    status: "published",
                }),
                strapi.documents("api::subscription.subscription").count({
                    status: "published",
                }),
                strapi.documents("api::request.request").count({
                    status: "published",
                }),
            ]);

            ctx.body = {
                data: {
                    totalProducts,
                    totalCategories,
                    totalSubscriptions,
                    totalRequests,
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
