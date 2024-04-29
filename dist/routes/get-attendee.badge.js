"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendeeBadge = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
async function getAttendeeBadge(app) {
    app.withTypeProvider().get('/attendees/:attendeeId/badge', {
        schema: {
            summary: 'Get an attendee badge',
            tags: ['attendees'],
            params: zod_1.z.object({
                attendeeId: zod_1.z.coerce.number().int(),
            }),
            response: {
                200: zod_1.z.object({
                    badge: zod_1.z.object({
                        name: zod_1.z.string(),
                        email: zod_1.z.string().email(),
                        eventTitle: zod_1.z.string(),
                        checkInURL: zod_1.z.string().url(),
                    }),
                }),
            },
        },
    }, async (request, reply) => {
        const { attendeeId } = request.params;
        const attendee = await prisma_1.prisma.attendee.findUnique({
            select: {
                name: true,
                email: true,
                event: {
                    select: {
                        title: true,
                    },
                },
            },
            where: {
                id: attendeeId,
            },
        });
        if (attendee === null) {
            throw new Error('Não foi encontrado o Participante');
        }
        const baseURL = `${request.protocol}://${request.hostname}`;
        const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL);
        return reply.send({
            badge: {
                name: attendee.name,
                email: attendee.email,
                eventTitle: attendee.event.title,
                checkInURL: checkInURL.toString(),
            },
        });
    });
}
exports.getAttendeeBadge = getAttendeeBadge;
