import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyRequest {
    dataloaders: {};
  }
}

export default fp(
  (app) => {
    app.decorateRequest("dataloaders")

    app.addHook("preHandler", async (req) => {
      // 매 요청 마다 생성!
      req.dataloaders = {};
    });
  },
  {
    name: "req.dataloaders",
  },
);
