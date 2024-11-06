import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import serverless from 'serverless-http'; // Import serverless-http
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { config } from './configuration/config';

async function startServer() {
    const app = express();
    
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: ({ req }) => {
            return { req };
        }
    });

    await server.start();
    server.applyMiddleware({ app });

    return serverless(app);
}

export default async (req: any, res: any) => {
    const server = await startServer();
    return server(req, res);
};
