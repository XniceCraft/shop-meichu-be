const generateSlug = async (slug: string, context: any) => {
    let generatedSlug = slugger(slug);
    let i = 1;
    let present = await slugAlreadyPresent(generatedSlug, context);

    while (present) {
        generatedSlug = slugger(`${slug} ${i}`);
        present = await slugAlreadyPresent(generatedSlug, context);
        i++;
    }

    return generatedSlug;
};

const slugger = (str: string) => {
    let sanitizedString = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    sanitizedString = sanitizedString.replace(/[^a-zA-Z0-9 ]/g, "");
    return sanitizedString.replace(/\s/g, "-").toLowerCase();
};

const slugAlreadyPresent = async (slug: string, context: any) => {
    const elements = await strapi.documents(context.uid).findMany({
        locale: context.params.locale,
        filters: {
            slug: {
                $eq: slug,
            },
        },
    });

    const filteredElements = elements.filter((element: any) => {
        return element.documentId != context.params.documentId;
    });
    return filteredElements.length > 0;
};

const slugParamsPresent = (paramsSlug: any) => {
    return paramsSlug != undefined && paramsSlug != null && paramsSlug != "";
};

const slugAvailable = async (slug: string, context: any) => {
    return (await slugAlreadyPresent(slug, context)) == false;
};

export { generateSlug, slugParamsPresent, slugAvailable };
