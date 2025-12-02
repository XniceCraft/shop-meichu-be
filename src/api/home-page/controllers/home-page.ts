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
                            populate: {
                                items: {
                                    populate: ["icon", "category"],
                                },
                            },
                        },
                        trendingProductSection: {
                            populate: {
                                products: {
                                    sort: "createdAt:desc",
                                    populate: {
                                        images: true,
                                    },
                                },
                            },
                        },
                        benefitSection: {
                            populate: {
                                section: true,
                                ctaButton: true,
                                items: {
                                    populate: {
                                        product: {
                                            sort: "createdAt:desc",
                                            populate: ["images"],
                                        },
                                    },
                                },
                            },
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
                            populate: {
                                section: true,
                                products: {
                                    populate: {
                                        images: true,
                                    },
                                },
                            },
                        },
                        recommendationSection: {
                            populate: {
                                section: true,
                                products: {
                                    populate: {
                                        images: true,
                                    },
                                },
                            },
                        },
                        trendingStyleSection: {
                            populate: {
                                section: true,
                                ctaButton: true,
                                products: {
                                    populate: {
                                        images: true,
                                    },
                                },
                            },
                        },
                        bestSellerSection: {
                            populate: ["section", "media"],
                        },
                        featuredCategorySection: {
                            populate: ["categories"],
                        },
                        reviewSection: {
                            populate: {
                                reviews: {
                                    populate: {
                                        avatar: true,
                                    },
                                },
                            },
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
        // async find(ctx) {
        //     await this.validateQuery(ctx);

        //     const query = await this.sanitizeQuery(ctx);
        //     const entity = await strapi
        //         .documents("api::home-page.home-page")
        //         .findFirst({
        //             status: "published",
        //             populate: {
        //                 heroSection: {
        //                     populate: ["section", "background"],
        //                 },
        //                 subHeroSection: {
        //                     populate: ["categories"],
        //                 },
        //                 trendingProductSection: {
        //                     populate: {
        //                         products: {
        //                             sort: "createdAt:desc",
        //                             populate: {
        //                                 images: true,
        //                             },
        //                         },
        //                     },
        //                 },
        //                 benefitSection: {
        //                     populate: {
        //                         section: true,
        //                         ctaButton: true,
        //                         products: {
        //                             sort: "createdAt:desc",
        //                             populate: {
        //                                 images: true,
        //                             },
        //                         },
        //                     },
        //                 },
        //                 philosophySection: {
        //                     populate: ["categories"],
        //                 },
        //                 collectionSection: {
        //                     populate: {
        //                         collections: {
        //                             populate: [
        //                                 "section",
        //                                 "category",
        //                                 "products",
        //                             ],
        //                         },
        //                     },
        //                 },
        //                 bundleSection: {
        //                     populate: ["section", "products"],
        //                 },
        //                 recommendationSection: {
        //                     populate: ["section", "products"],
        //                 },
        //                 trendingStyleSection: {
        //                     populate: ["section", "ctaButton", "products"],
        //                 },
        //                 bestSellerSection: {
        //                     populate: ["section", "media"],
        //                 },
        //                 featuredCategorySection: {
        //                     populate: ["categories"],
        //                 },
        //                 reviewSection: {
        //                     populate: ["reviews"],
        //                 },
        //                 latestTrendSection: {
        //                     populate: [
        //                         "section",
        //                         "ctaButton",
        //                         "leftImage",
        //                         "rightImage",
        //                     ],
        //                 },
        //                 faqSection: {
        //                     populate: ["section", "questions"],
        //                 },
        //             },
        //             ...query,
        //         });

        //     const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        //     return this.transformResponse(sanitizedEntity);
        // },
    })
);
