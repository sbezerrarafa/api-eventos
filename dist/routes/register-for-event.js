"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerForEvent = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function registerForEvent(app) {
    app.withTypeProvider().post('/events/:eventId/attendees', {
        schema: {
            body: zod_1.z.object({
                name: zod_1.z.string().min(4),
                email: zod_1.z.string().email(),
            }),
            params: zod_1.z.object({
                eventId: zod_1.z.string().uuid(),
            }),
            response: {
                201: zod_1.z.object({
                    attendeeId: zod_1.z.number(),
                }),
            },
        },
    }, async (request, reply) => {
        const { eventId } = request.params;
        const { name, email } = request.body;
        const attendeeFromEmail = await prisma_1.prisma.attendee.findUnique({
            where: {
                eventId_email: {
                    email,
                    eventId,
                },
            },
        });
        if (attendeeFromEmail !== null) {
            throw new Error('este email ja existe no evento');
        }
        const [event, maxPartipanteNoEvento] = await Promise.all([
            prisma_1.prisma.event.findUnique({
                where: {
                    id: eventId,
                },
            }),
            prisma_1.prisma.attendee.count({
                where: {
                    eventId,
                },
            }),
        ]);
        if (event?.maximumAttendees &&
            maxPartipanteNoEvento >= event?.maximumAttendees) {
            throw new Error('numero de partipantes já foi batido neste evento');
        }
        const attendee = await prisma_1.prisma.attendee.create({
            data: {
                name,
                email,
                eventId,
            },
        });
        return reply.status(201).send({ attendeeId: attendee.id });
    });
}
exports.registerForEvent = registerForEvent;
