import type { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { createSchema, createYoga, useSchema } from "graphql-yoga";

export default fp(
  (app) => {
    interface Context {
      app: FastifyInstance;
      req: FastifyRequest;
    }

    const schema = createSchema<Context>({
      typeDefs: `
      type Query {
        ping: String!
      }
    `,
      resolvers: {
        Query: {
          ping() {
            return "pong";
          },
        },
      },
    });

    const yoga = createYoga<Context>({
      schema,
    });

    app.route({
      method: ["GET", "POST", "OPTIONS"],
      url: yoga.graphqlEndpoint,
      async handler(req, reply) {
        const context: Context = {
          app,
          req,
        };
        const response = await yoga.handleNodeRequestAndResponse(
          req,
          reply,
          context,
        );

        response.headers.forEach((value, key) => {
          reply.header(key, value);
        });

        reply.status(response.status);
        reply.send(response.body);

        return reply;
      },
    });
  },
  {
    name: "app.graphql",
  },
);
