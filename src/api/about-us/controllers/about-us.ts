/**
 * about-us controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::about-us.about-us",
    ({ strapi }) => ({
        async find(ctx) {
            await this.validateQuery(ctx);

            const query = await this.sanitizeQuery(ctx);
            const entity = await strapi
                .documents("api::about-us.about-us")
                .findFirst({
                    status: "published",
                    populate: {
                        heading: {
                            populate: {
                                thumbnail: true,
                            },
                        },
                        messageSection: {
                            populate: {
                                section: true,
                                image: true,
                            },
                        },
                        videoSection: {
                            populate: {
                                video: true,
                                cards: {
                                    populate: {
                                        ctaButton: true,
                                    },
                                },
                            },
                        },
                        reviewSection: {
                            populate: {
                                section: true,
                                reviews: {
                                    populate: {
                                        avatar: true,
                                    },
                                },
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
