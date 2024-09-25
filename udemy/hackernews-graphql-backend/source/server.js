const { ApolloServer, gql } = require("apollo-server");

// GraphQL schema definition
const typeDefs = gql`
  type Query {
    info: String!
  }
`;

// Resolvers for the schema fields
const resolvers = {
  Query: {
    info: () => "Hacker News Clone",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url} is running`));
