import fastifyEnv from "@fastify/env";
import { type Static, Type } from "@sinclair/typebox";
import fp from "fastify-plugin";

const schema = Type.Object({
  COOKIE_SECRET: Type.String(),
});

// fastify에 있는 모듈을 확장한다.
// fastify는 interface merging을 해줌
declare module "fastify" {
  interface FastifyInstance {
    env: Static<typeof schema>;
  }
}

export default fp(
  async (app) => {
    await app.register(fastifyEnv, {
      confKey: "env",
      schema,
    });
  },
  {
    name: "app.env",
    // dependencies: ["app.gracefulShutdown"],
  },
);
