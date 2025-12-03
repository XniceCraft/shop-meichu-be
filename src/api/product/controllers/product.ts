/**
 * product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::product.product",
    ({ strapi }) => ({
        async findOne(ctx) {
            await this.validateQuery(ctx);

            const { slug } = ctx.params;
            const sanitizedQueryParams = await this.sanitizeQuery(ctx);
            const entity = await strapi
                .documents("api::product.product")
                .findFirst({
                    status: "published",
                    where: { slug },
                    populate: {
                        images: true,
                        category: true,
                    },
                    ...sanitizedQueryParams,
                });

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return await this.transformResponse(sanitizedEntity);
        },
    })
);
