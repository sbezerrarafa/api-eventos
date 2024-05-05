import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendee.badge';
import { checkIn } from './routes/check-in';
import { getEventAttendees } from './routes/get-event-attendees';
import fastifyCors from '@fastify/cors';

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);

app.get('/test', async (request, reply) => {
  return { message: 'This is a test route' };
});

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('http server running!');
});
