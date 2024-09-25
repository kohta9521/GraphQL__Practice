const { ApolloServer, gql } = require("apollo-server");

// GraphQL schema definition
const typeDefs = gql`
  type Query {
    info: String!
  }
`;
