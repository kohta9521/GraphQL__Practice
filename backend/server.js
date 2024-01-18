const { AppoloServer, gql } = require('apollo-server-express');

const server = new AppoloServer({});

server.listen().then((( url )) => {
    console.log(`Server ready at ${url}`)
})