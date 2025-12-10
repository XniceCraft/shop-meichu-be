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
                        fields: true,
                        images: true,
                        category: true,
                    },
                    ...sanitizedQueryParams,
                });

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return await this.transformResponse(sanitizedEntity);
        },

        async delete(ctx) {
            await this.validateQuery(ctx);

            const { slug } = ctx.params;
            if (!slug) return ctx.notFound("Slug not defined");

            const entity = await strapi
                .documents("api::product.product")
                .findFirst({
                    status: "published",
                    where: { slug },
                });

            if (!entity) return ctx.notFound("Product not found");

            await strapi.documents("api::product.product").update({
                documentId: entity.documentId,
                data: {
                    name: entity.name, // For slug purpose
                    publishedAt: null,
                },
            });

            ctx.status = 204;
            ctx.body = null;
        },
    })
);
