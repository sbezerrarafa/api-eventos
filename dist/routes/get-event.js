"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvent = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function getEvent(app) {
    app.withTypeProvider().get('/events/:eventId', {
        schema: {
            params: zod_1.z.object({
                eventId: zod_1.z.string().uuid(),
            }),
            response: {
                200: {
                    event: zod_1.z.object({
                        id: zod_1.z.string().uuid(),
                        title: zod_1.z.string(),
                        slug: zod_1.z.string(),
                        details: zod_1.z.string().nullable(),
                        maximumAttendees: zod_1.z.number().int().nullable(),
                        attendeesAmount: zod_1.z.number().int(),
                    }),
                },
            },
        },
    }, async (request, reply) => {
        const { eventId } = request.params;
        const event = await prisma_1.prisma.event.findUnique({
            select: {
                id: true,
                title: true,
                slug: true,
                details: true,
                maximumAttendees: true,
                _count: {
                    select: {
                        attendees: true,
                    },
                },
            },
            where: {
                id: eventId,
            },
        });
        if (event === null) {
            throw new Error('Evento nao encontrado');
        }
        return reply.send({
            event: {
                id: event.id,
                title: event.title,
                slug: event.slug,
                details: event.details,
                maximumAttendees: event.maximumAttendees,
                attendeesAmount: event._count.attendees,
            },
        });
    });
}
exports.getEvent = getEvent;
