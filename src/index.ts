import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from '../schema';
import db from '../_db';

const resolvers = {
  Query: {
    games: () => {
      return db.games;
    },
    game: (_: null, args: { id: string }) => {
      return db.games.find((game) => game.id === args.id);
    },
    reviews: () => {
      return db.reviews;
    },
    review: (_: null, args: { id: string }) => {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors: () => {
      return db.authors;
    },
    author: (_: null, args: { id: string }) => {
      return db.authors.find((author) => author.id === args.id);
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
