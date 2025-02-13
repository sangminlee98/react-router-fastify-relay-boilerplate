import fp from "fastify-plugin";
import { reactRouterFastify } from "@mcansh/remix-fastify/react-router";
import type {
  RawServerBase,
  FastifyInstance,
  FastifyRequest,
  RouteGenericInterface,
} from "fastify";

declare module "react-router" {
  interface AppLoadContext {
    app: FastifyInstance;
    req: FastifyRequest<RouteGenericInterface, RawServerBase>;
  }
}

export default fp(
  async (app) => {
    await app.register(reactRouterFastify, {
      buildDirectory: "./dist/web",
      getLoadContext(req) {
        return {app, req}
      }
    });
  },
  { name: "reactRouter" },
);
