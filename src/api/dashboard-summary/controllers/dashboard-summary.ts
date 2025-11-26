/**
 * A set of functions called "actions" for `dashboard-summary`
 */

export default {
    getSummary: async (ctx, next) => {
        try {
            const totalProducts = await strapi
                .query("api::product.product")
                .count();
            const totalCategories = await strapi
                .query("api::category.category")
                .count();

            ctx.body = {
                data: {
                    totalProducts,
                    totalCategories,
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
