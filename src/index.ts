import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from '../schema';
import db from '../_db';

const resolvers = {
  Query: {
    games: () => {
      return db.games;
    },
    reviews: () => {
      return db.reviews;
    },
    authors: () => {
      return db.authors;
    },
  },
};

// server setup
const server = new ApolloServer({
  // typeDefs property
  // type definitions; descriptions of data types and their relationships with other data types
  typeDefs,

  // resolvers property
  // resolver functions that determine how queries are responded to for different data
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server is ready at port ${url}`);
