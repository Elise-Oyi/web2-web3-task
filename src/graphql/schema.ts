import { gql } from "apollo-server-express";

export const typeDefs = gql`
 type User 
   {
        id:ID!
        name: String
        email: String
        walletAddress: String
        createdAt: String!
    }

   type BlockchainStats
   {
        count: Int!
        contractAddress: String!
    }

     type Query 
     {
        getBlockchainCount: BlockchainStats!
        getAllUsers: [User!]!
    }

     type Mutation {
        createUser(name: String!, email: String!, walletAddress: String): User!
        incrementBlockchainCounter: BlockchainStats!
    }
`;
