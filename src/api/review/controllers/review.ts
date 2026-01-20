/**
 * review controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::review.review",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            await this.validateQuery(ctx);

            const sanitizedQueryParams = await this.sanitizeQuery(ctx);
            const entity = await strapi
                .documents("api::review.review")
                .findOne({
                    documentId: id,
                    ...sanitizedQueryParams,
                    populate: {
                        avatar: true,
                        ...(sanitizedQueryParams as any).populate,
                    },
                });

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return await this.transformResponse(sanitizedEntity);
        },
    })
);
