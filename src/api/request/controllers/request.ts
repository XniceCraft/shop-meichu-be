/**
 * request controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::request.request",
    ({ strapi }) => ({
        async softDelete(ctx) {
            await this.validateQuery(ctx);

            const { slug } = ctx.params;
            if (!slug) return ctx.notFound("Slug not defined");

            const request = await strapi
                .documents("api::request.request")
                .findFirst({
                    status: "published",
                    where: { slug },
                });

            if (!request) return ctx.notFound("Request not found");

            const entity = await strapi
                .documents("api::request.request")
                .unpublish({
                    documentId: request.documentId,
                });

            ctx.status = 204;
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return await this.transformResponse(sanitizedEntity);
        },
    })
);
