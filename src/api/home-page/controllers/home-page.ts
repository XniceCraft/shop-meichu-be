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
                            populate: ["section", "background", "ctaButton"],
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
                                sideText: true,
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
                                backgroundImage: true,
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
                            populate: {
                                categories: {
                                    populate: {
                                        thumbnail: true,
                                    },
                                },
                            },
                        },
                        collectionSection: {
                            populate: {
                                section: true,
                                collections: {
                                    populate: {
                                        section: true,
                                        category: {
                                            populate: {
                                                thumbnail: true,
                                            },
                                        },
                                        products: {
                                            populate: {
                                                images: true,
                                            },
                                        },
                                    },
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
                            populate: ["section", "media", "runningText"],
                        },
                        featuredCategorySection: {
                            populate: {
                                categories: {
                                    populate: {
                                        category: {
                                            populate: {
                                                thumbnail: true,
                                            },
                                        },
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
