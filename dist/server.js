"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const create_event_1 = require("./routes/create-event");
const register_for_event_1 = require("./routes/register-for-event");
const get_event_1 = require("./routes/get-event");
const get_attendee_badge_1 = require("./routes/get-attendee.badge");
const app = (0, fastify_1.default)();
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.register(create_event_1.createEvent);
app.register(register_for_event_1.registerForEvent);
app.register(get_event_1.getEvent);
app.register(get_attendee_badge_1.getAttendeeBadge);
app.listen({ port: 3333 }).then(() => {
    console.log('http server running!');
});
