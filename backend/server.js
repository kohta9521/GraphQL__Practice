const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const { createServer } = require("http");

const books = [
  // 既存のコード
];

const typeDefs = gql`
  // 既存のコード
`;

const resolvers = {
  // 既存のコード
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  const httpServer = createServer(app);
  httpServer.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
