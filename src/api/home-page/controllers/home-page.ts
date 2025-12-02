/**
 * home-page controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::home-page.home-page",
    ({ strapi }) => ({
        async find(ctx) {
            await this.validateQuery(ctx);

            const query = await this.sanitizeQuery(ctx);
            const entity = await strapi
                .documents("api::home-page.home-page")
                .findFirst({
                    status: "published",
                    populate: {
                        heroSection: {
                            populate: ["section", "background"],
                        },
                        subHeroSection: {
                            populate: ["categories"],
                        },
                        trendingProductSection: {
                            populate: ["products"],
                        },
                        benefitSection: {
                            populate: ["section", "ctaButton", "products"],
                        },
                        philosophySection: {
                            populate: ["categories"],
                        },
                        collectionSection: {
                            populate: {
                                collections: {
                                    populate: [
                                        "section",
                                        "category",
                                        "products",
                                    ],
                                },
                            },
                        },
                        bundleSection: {
                            populate: ["section", "products"],
                        },
                        recommendationSection: {
                            populate: ["section", "products"],
                        },
                        trendingStyleSection: {
                            populate: ["section", "ctaButton", "products"],
                        },
                        bestSellerSection: {
                            populate: ["section", "media"],
                        },
                        featuredCategorySection: {
                            populate: ["categories"],
                        },
                        reviewSection: {
                            populate: ["reviews"],
                        },
                        latestTrendSection: {
                            populate: [
                                "section",
                                "ctaButton",
                                "leftImage",
                                "rightImage",
                            ],
                        },
                        faqSection: {
                            populate: ["section", "questions"],
                        },
                    },
                    ...query,
                });

            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

            return this.transformResponse(sanitizedEntity);
        },
    })
);
