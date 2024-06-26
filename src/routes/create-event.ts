import fastify, { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { generateSlug } from '../utils/generate-slug';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export async function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events',
    {
      schema: {
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendees } = request.body;

      const slug = generateSlug(title);

      const eventComMesmoNome = await prisma.event.findUnique({
        where: {
          slug, //pq a variavel é mesmo nome do campo
        },
      });

      if (eventComMesmoNome !== null) {
        throw new Error('já existe um evento com este nome');
      }

      const event = await prisma.event.create({
        data: {
          title: title,
          details: details,
          maximumAttendees: maximumAttendees,
          slug: slug,
        },
      });

      return reply.status(201).send({ eventId: event.id });
    },
  );
}
