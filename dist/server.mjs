import {
  checkIn
} from "./chunk-K4UEK7AB.mjs";
import "./chunk-JRO4E4TH.mjs";
import {
  createEvent
} from "./chunk-W3XVLORV.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-TV7CLS6W.mjs";
import {
  getEventAttendees
} from "./chunk-7GKGGQK5.mjs";
import {
  getEvent
} from "./chunk-VDR7UAYO.mjs";
import {
  registerForEvent
} from "./chunk-GCN7ENXM.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("http server running!");
});
