/**
 * global controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::global.global",
    ({ strapi }) => ({
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
                            populate: ["navigations"],
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
