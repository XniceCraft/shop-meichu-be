/**
 * request controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::request.request",
    ({ strapi }) => ({
        async softDelete(ctx) {
            await this.validateQuery(ctx);

            const { id } = ctx.params;
            if (!id) return ctx.notFound("Slug not defined");

            const request = await strapi
                .documents("api::request.request")
                .findOne({
                    documentId: id,
                    status: "published",
                });

            if (!request) return ctx.notFound("Request not found");

            const entity = await strapi
                .documents("api::request.request")
                .unpublish({
                    documentId: request.documentId,
                });

            ctx.status = 204;
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return await this.transformResponse(sanitizedEntity);
        },

        async nextAction(ctx) {
            await this.validateQuery(ctx);
            try {
                const { id } = ctx.params;
                const request = await strapi
                    .documents("api::request.request")
                    .findOne({
                        documentId: id,
                    });

                if (!request) {
                    return ctx.notFound("Order not found");
                }

                switch (request.requestStatus) {
                    case "cancelled":
                        return ctx.badRequest("Order is already cancelled");
                    case "completed":
                        return ctx.badRequest("Order is already completed");
                }

                let nextRequestStatus:
                    | "pending"
                    | "confirmed"
                    | "in_progress"
                    | "completed"
                    | "cancelled" = "pending";

                switch (request.requestStatus) {
                    case "pending":
                        nextRequestStatus = "confirmed";
                        break;
                    case "confirmed":
                        nextRequestStatus = "in_progress";
                        break;
                    case "in_progress":
                        nextRequestStatus = "completed";
                        break;
                }

                const updatedOrder = await strapi
                    .documents("api::request.request")
                    .update({
                        documentId: id,
                        data: {
                            requestStatus: nextRequestStatus,
                        },
                    });

                const sanitizedEntity = await this.sanitizeOutput(
                    updatedOrder,
                    ctx
                );

                return await this.transformResponse(sanitizedEntity, null);
            } catch (error) {
                strapi.log.error("Order next action failed:", error);
                return ctx.internalServerError("Failed to update order");
            }
        },

        async cancelOrder(ctx) {
            try {
                const { id } = ctx.params;
                const request = await strapi
                    .documents("api::request.request")
                    .findOne({
                        documentId: id,
                    });

                if (!request) {
                    return ctx.notFound("Order not found");
                }

                switch (request.requestStatus) {
                    case "cancelled":
                        return ctx.badRequest("Order is already cancelled");
                    case "completed":
                        return ctx.badRequest("Order is already completed");
                    case "in_progress":
                        return ctx.badRequest(
                            "Order is already in progress. Please contact our support"
                        );
                }

                const cancelledRequest = await strapi
                    .documents("api::request.request")
                    .update({
                        documentId: id,
                        data: {
                            requestStatus: "cancelled",
                        },
                    });

                const sanitizedEntity = await this.sanitizeOutput(
                    cancelledRequest,
                    ctx
                );

                const response = await this.transformResponse(
                    sanitizedEntity,
                    null
                );
                response["message"] = "Successfully cancelled order";

                return response;
            } catch (error) {
                strapi.log.error("Order cancel failed:", error);
                return ctx.internalServerError("Failed to cancel order");
            }
        },
    })
);
