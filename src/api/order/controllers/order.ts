/**
 * order controller
 */

import { factories } from "@strapi/strapi";
import { createOrderSchema } from "../../../validations/order/create-order";

export default factories.createCoreController(
    "api::order.order",
    ({ strapi }) => ({
        async userCreateOrder(ctx) {
            try {
                const { buyerName, contact, orderItems } =
                    await createOrderSchema.validate(ctx.request.body);

                const orderedItemIds = [
                    ...new Set(orderItems.map((item) => item.productId)),
                ];

                const order = await strapi.db.transaction(async () => {
                    const products = await strapi
                        .documents("api::product.product")
                        .findMany({
                            filters: {
                                id: {
                                    $in: orderedItemIds,
                                },
                            },
                        });

                    const existingIds = new Set(products.map((p) => p.id));
                    const invalidIds = orderedItemIds.filter(
                        (id) => !existingIds.has(id)
                    );

                    if (invalidIds.length > 0) {
                        throw new Error(
                            `These product IDs do not exist: ${invalidIds.join(
                                ", "
                            )}`
                        );
                    }

                    const productMap = products.reduce((acc, product) => {
                        acc[product.id] = product;
                        return acc;
                    }, {} as Record<number, (typeof products)[number]>);

                    const outOfStockItems = [];
                    for (const item of orderItems) {
                        const product = productMap[item.productId]!;
                        if (product.stock < item.quantity) {
                            outOfStockItems.push({
                                name: product.name,
                                available: product.stock,
                                requested: item.quantity,
                            });
                        }
                    }

                    if (outOfStockItems.length > 0) {
                        throw new Error(
                            `Insufficient stock: ${outOfStockItems
                                .map(
                                    (item) =>
                                        `${item.name} (available: ${item.available}, requested: ${item.requested})`
                                )
                                .join(", ")}`
                        );
                    }

                    const totalPrice = orderItems.reduce(
                        (total, item) =>
                            total +
                            item.quantity *
                                Number(productMap[item.productId]!.price),
                        0
                    );

                    await Promise.all(
                        orderItems.map((item) => {
                            const product = productMap[item.productId]!;
                            return strapi
                                .documents("api::product.product")
                                .update({
                                    documentId: product.documentId,
                                    data: {
                                        name: product.name, // Needed for slug
                                        stock: product.stock - item.quantity,
                                    },
                                });
                        })
                    );

                    const createdOrder = await strapi
                        .documents("api::order.order")
                        .create({
                            data: {
                                buyerName,
                                contact,
                                orderStatus: "pending",
                                items: orderItems.map((item) => ({
                                    product: item.productId,
                                    quantity: item.quantity,
                                    accumulatedPrice:
                                        item.quantity *
                                        Number(
                                            productMap[item.productId]!.price
                                        ),
                                })),
                                totalPrice,
                            },
                            populate: {
                                items: true,
                            },
                        });

                    return createdOrder;
                });

                return order;
            } catch (error) {
                if (error.name === "ValidationError") {
                    return ctx.badRequest("Validation failed", {
                        errors: error.errors,
                    });
                }

                if (
                    error.message?.includes("do not exist") ||
                    error.message?.includes("Insufficient stock")
                ) {
                    return ctx.badRequest(error.message);
                }

                strapi.log.error("Order creation failed:", error);
                return ctx.internalServerError("Failed to create order");
            }
        },
    })
);
