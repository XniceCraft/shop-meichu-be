/**
 * collection controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::collection.collection",
    ({ strapi }) => ({
        async find(ctx) {
            await this.validateQuery(ctx);

            const query = await this.sanitizeQuery(ctx);
            const entity = await strapi
                .documents("api::collection.collection")
                .findFirst({
                    status: "published",
                    populate: {
                        heading: {
                            populate: {
                                thumbnail: true,
                            },
                        },
                    },
                    ...query,
                });

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

            return this.transformResponse(sanitizedEntity);
        },
    })
);
