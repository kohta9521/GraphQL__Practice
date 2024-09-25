const { ApolloServer, gql } = require("apollo-server");

// Hacker News data
let links = [
  {
    id: "link-0",
    description: "GraphQL Tutorial for Udemy",
    url: "https://www.udemy.com/graphql-tutorial/",
  },
];

// GraphQL schema definition
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

// Resolvers for the schema fields
const resolvers = {
  Query: {
    info: () => "Hacker News Clone",
    feed: () => links,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url} is running`));
