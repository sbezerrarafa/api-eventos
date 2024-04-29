"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const generate_slug_1 = require("../utils/generate-slug");
async function createEvent(app) {
    app.withTypeProvider().post('/events', {
        schema: {
            body: zod_1.z.object({
                title: zod_1.z.string().min(4),
                details: zod_1.z.string().nullable(),
                maximumAttendees: zod_1.z.number().int().positive().nullable(),
            }),
            response: {
                201: zod_1.z.object({
                    eventId: zod_1.z.string().uuid(),
                }),
            },
        },
    }, async (request, reply) => {
        const { title, details, maximumAttendees } = request.body;
        const slug = (0, generate_slug_1.generateSlug)(title);
        const eventComMesmoNome = await prisma_1.prisma.event.findUnique({
            where: {
                slug, //pq a variavel é mesmo nome do campo
            },
        });
        if (eventComMesmoNome !== null) {
            throw new Error('já existe um evento com este nome');
        }
        const event = await prisma_1.prisma.event.create({
            data: {
                title: title,
                details: details,
                maximumAttendees: maximumAttendees,
                slug: slug,
            },
        });
        return reply.status(201).send({ eventId: event.id });
    });
}
exports.createEvent = createEvent;
