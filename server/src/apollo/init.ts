import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

import express from "express";
import http from "http";
import { reqResObjType } from "./types";

// --- importing typeDefs and resolvers ---
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

export async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({req, res}: reqResObjType) => ({
        req, res
      }),
      csrfPrevention: true,
      cache: 'bounded',
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    });
    await server.start();
    server.applyMiddleware({
      app,
      path: "/",
      cors: { credentials: true, origin: true, optionsSuccessStatus: 200},
    });
  
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 4000 }, resolve)
    );

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }