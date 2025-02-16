const { ApolloServer, gql } = require("apollo-server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const cors = require("cors");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
// const { url } = await startStandaloneServer(server, {
//   context: async () => {
//     const { cache } = server;

//     return {
//       dataSources: {
//         trackAPI: new TrackAPI({ cache }),
//       },
//     };
//   },
// });
server.listen().then(({ url }) => {
  console.log(`🚀 Local GraphQL server running at ${url}`);
});
