import { generateSlug, slugParamsPresent, slugAvailable } from "./slugger";

const slugMe = {
    "api::category.category": "name",
    "api::product.product": "name",
};

strapi.documents.use(async (context: any, next: any) => {
    if (!Object.keys(slugMe).includes(context.uid)) {
        return next();
    }

    if (["create", "update"].includes(context.action)) {
        if (
            slugParamsPresent(context.params.data.slug) &&
            (await slugAvailable(context.params.data.slug, context))
        ) {
            return next();
        }

        let field = context.params.data[slugMe[context.uid]];
        const newSlug = await generateSlug(field, context);
        context.params.data.slug = newSlug;
    }

    return next();
});

export default {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register(/* { strapi }: { strapi: Core.Strapi } */) {},

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
