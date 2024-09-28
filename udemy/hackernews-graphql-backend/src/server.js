const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");

// Hacker News data
let links = [
  {
    id: "link-0",
    description: "GraphQL Tutorial for Udemy",
    url: "https://www.udemy.com/graphql-tutorial/",
  },
];

// Resolvers for the schema fields
const resolvers = {
  Query: {
    info: () => "Hacker News Clone",
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      let isCount = links.length;

      const link = {
        id: `link-${isCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url} is running`));
