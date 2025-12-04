/**
 * product controller
 */

export default {
    async getRecommendedProducts(ctx) {
        const contentType = strapi.contentType("api::product.product");

        await strapi.contentAPI.validate.query(ctx.query, contentType, {
            auth: ctx.state.auth,
        });
        const sanitizedQueryParams = await strapi.contentAPI.sanitize.query(
            ctx.query,
            contentType,
            { auth: ctx.state.auth }
        );

        const recommendedProducts = await strapi
            .documents("api::product.product")
            .findMany({
                sort: "sold:desc",
                limit: 6,
                populate: {
                    images: true,
                },
                ...sanitizedQueryParams,
            });

        return { data: recommendedProducts, meta: null };
    },
};
