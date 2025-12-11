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

        async softDelete(ctx) {
            await this.validateQuery(ctx);

            const { slug } = ctx.params;
            if (!slug) return ctx.notFound("Slug not defined");

            const product = await strapi
                .documents("api::product.product")
                .findFirst({
                    status: "published",
                    where: { slug },
                });

            if (!product) return ctx.notFound("Product not found");

            const entity = await strapi
                .documents("api::product.product")
                .unpublish({
                    documentId: product.documentId,
                });

            ctx.status = 204;
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return await this.transformResponse(sanitizedEntity);
        },
    })
);
