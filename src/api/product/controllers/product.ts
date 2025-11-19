/**
 * product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::product.product",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { slug } = ctx.params;

            const entity = await strapi
                .documents("api::product.product")
                .findFirst({
                    status: "published",
                    where: { slug },
                    populate: {
                        image: true,
                    },
                });

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

            return this.transformResponse(sanitizedEntity);
        },
    })
);
