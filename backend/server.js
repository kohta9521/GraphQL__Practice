const { AppoloServer, gql } = require("apollo-server-express");

const books = [
  {
    title: "吾輩は猫である",
    author: "夏目漱石",
  },
  {
    title: "走れメロス",
    author: "太宰治",
  },
];

const typeDefs = gql`
  type Book {
    title: String,
    author: String
  }

  typeQuery {
    test: [book]
  }
`;

const resolvers = {
  Query: {
    test: () => books,
  },
};

const server = new AppoloServer({});

server.listen().then((url) => {
  console.log(`Server ready at ${url}`);
});
