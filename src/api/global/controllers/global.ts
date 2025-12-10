/**
 * global controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::global.global",
    ({ strapi }) => ({
        async find(ctx) {
            await this.validateQuery(ctx);

            const entity = await strapi
                .documents("api::global.global")
                .findFirst({
                    status: "published",
                    populate: {
                        favicon: true,
                    },
                });

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

            return this.transformResponse(sanitizedEntity);
        },

        async getFooter(ctx) {
            await this.validateQuery(ctx);

            const entity = await strapi
                .documents("api::global.global")
                .findFirst({
                    status: "published",
                    populate: {
                        footer: {
                            populate: {
                                runningText: true,
                                navigationGroups: {
                                    populate: {
                                        navigations: true,
                                    },
                                },
                                socialMedia: true,
                            },
                        },
                    },
                    fields: [],
                });

            const sanitizedEntity = await this.sanitizeOutput(
                entity.footer,
                ctx
            );

            return this.transformResponse(sanitizedEntity);
        },

        async getNavbar(ctx) {
            await this.validateQuery(ctx);

            const entity = await strapi
                .documents("api::global.global")
                .findFirst({
                    status: "published",
                    populate: {
                        navbar: {
                            populate: {
                                brand: {
                                    populate: {
                                        icon: true,
                                    },
                                },
                                navigations: true,
                            },
                        },
                    },
                    fields: [],
                });

            const sanitizedEntity = await this.sanitizeOutput(
                entity.navbar,
                ctx
            );

            return this.transformResponse(sanitizedEntity);
        },
    })
);
