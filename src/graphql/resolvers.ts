import { config } from "../configuration/config";
import { BlockchainService } from "../services/blockchain";
import { DatabaseService } from "../services/database";

const blockchainService = new BlockchainService();
const databaseService = new DatabaseService();


export const resolvers = {
    Query: {
        getBlockchainCount: async () => {
            try {
                const count = await blockchainService.getCount();
                if (typeof count === 'undefined') {
                    throw new Error("Count is undefined in blockchain response");
                }
                return {
                    count,
                    contractAddress: config?.ethereum?.contractAddress
                };
            } catch (error: any) {
                console.error('GraphQL getCount error:', error.stack || error);
                throw new Error(`Failed to get count: ${error.message}`);
            }
        },
        getAllUsers: async () => {
            return await databaseService.getUsers();
        }
    },
    Mutation: {
        createUser: async (_: any, { name, email, walletAddress }: {
            name: string,
            email: string,
            walletAddress?: string
        }) => {
            return await databaseService.createUser({ name, email, walletAddress });
        }, 
        incrementBlockchainCounter: async () => {
            try {
                const count = await blockchainService.incrementCounter();
                if (typeof count === 'undefined') {
                    throw new Error("Count is undefined after incrementing");
                }

                return {
                    count,
                    contractAddress: config?.ethereum?.contractAddress 
                };
            } catch (error: any) {
                console.error('GraphQL increment error:', error.stack || error);
                throw new Error(`incrementing blockchain counter: ${error.message}`);
            }
        },
    },
};