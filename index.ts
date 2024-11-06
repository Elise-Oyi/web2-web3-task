import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './src/graphql/schema';
import { resolvers } from './src/graphql/resolvers';
import { config } from './src/configuration/config';


async function startServer() {
    const app = express();
    
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: ({ req }) => {
            // You can add authentication here
            return { req };
        }
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(config.server.port, () => {
        console.log(
            `🚀 Server ready at http://localhost:${config.server.port}${server.graphqlPath}`
        );
    });
}

startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
