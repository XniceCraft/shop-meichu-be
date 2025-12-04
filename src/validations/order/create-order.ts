import { yup } from "@strapi/utils";

export const createOrderSchema = yup.object({
    buyerName: yup
        .string()
        .required()
        .trim()
        .min(2, "Buyer name must be at least 2 characters")
        .max(100, "Buyer name is too long"),

    contact: yup
        .string()
        .required()
        .trim()
        .matches(
            /^[\w\-.+]+@[\w\-.]+\.\w{2,}$|^\+?[\d\s\-()]{10,}$/,
            "Must be a valid email or phone number"
        ),

    orderItems: yup
        .array()
        .of(
            yup.object({
                productId: yup
                    .number()
                    .required()
                    .positive("Product ID must be positive")
                    .integer("Product ID must be an integer"),

                quantity: yup
                    .number()
                    .required()
                    .positive("Quantity must be positive")
                    .integer("Quantity must be a whole number")
                    .min(1, "Quantity must be at least 1")
                    .max(1000, "Quantity cannot exceed 1000 per item"),
            })
        )
        .required()
        .min(1, "Order must contain at least one item")
        .max(50, "Order cannot contain more than 50 different items")
        .test(
            "unique-products",
            "Duplicate product IDs are not allowed",
            (items) => {
                if (!items) return true;
                const ids = items.map((item) => item.productId);
                return ids.length === new Set(ids).size;
            }
        ),
});
