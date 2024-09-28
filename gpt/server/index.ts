const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(title: String!): Todo
    toggleTodoCompleted(id: ID!): Todo
  }
`;

let todos = [
  { id: "1", title: "Learn GraphQL", completed: false },
  { id: "2", title: "Build a Todo App", completed: false },
];

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_, { title }) => {
      const newTodo = { id: `${todos.length + 1}`, title, completed: false };
      todos.push(newTodo);
      return newTodo;
    },
    toggleTodoCompleted: (_, { id }) => {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      return todo;
    },
  },
};

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
};

startServer();
