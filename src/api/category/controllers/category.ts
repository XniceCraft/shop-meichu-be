/**
 * category controller
 */
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::category.category",
    ({ strapi }) => ({
        async findOne(ctx) {
            await this.validateQuery(ctx);

            const { slug } = ctx.params;
            const sanitizedQueryParams = await this.sanitizeQuery(ctx);
            const entity = await strapi
                .documents("api::category.category")
                .findFirst({
                    status: "published",
                    where: { slug },
                    ...sanitizedQueryParams,
                });

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return await this.transformResponse(sanitizedEntity);
        },

        async getProducts(ctx) {
            await this.validateQuery(ctx);

            const { slug } = ctx.params;
            const sanitizedQueryParams = await this.sanitizeQuery(ctx);
            const page = Math.max(1, parseInt(ctx.query.page as string) || 1);
            const pageSize = Math.min(
                100,
                Math.max(1, parseInt(ctx.query.pageSize as string) || 25)
            );

            const category = await strapi
                .documents("api::category.category")
                .findFirst({
                    status: "published",
                    where: { slug },
                    ...sanitizedQueryParams,
                });

            if (!category) {
                return ctx.notFound("Category not found");
            }

            const products = await strapi
                .documents("api::product.product")
                .findMany({
                    status: "published",
                    where: {
                        category: category.id,
                    },
                    start: (page - 1) * pageSize,
                    limit: pageSize,
                });

            const total = await strapi.documents("api::product.product").count({
                status: "published",
                where: {
                    category: category.id,
                },
            });

            const sanitizedEntity = await this.sanitizeOutput(products, ctx);

            return {
                data: sanitizedEntity,
                meta: {
                    pagination: {
                        page,
                        pageSize,
                        pageCount: Math.ceil(total / pageSize),
                        total,
                    },
                },
            };
        },
    })
);
