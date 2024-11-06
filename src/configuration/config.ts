import dotenv from 'dotenv';

dotenv.config();

const {
    MONGODB_URI,
    PRIVATE_KEY,
    CONTRACT_ADDRESS,
    INFURA_API_KEY,
    PORT
} = process.env;


export const config = {
    mongodb: {
        uri: MONGODB_URI,
        options: {
            retryWrites: true,
            w: 1
        }
    },
    ethereum: {
        privateKey: PRIVATE_KEY,
        contractAddress: CONTRACT_ADDRESS,
        provider:`https://sepolia.infura.io/v3/${INFURA_API_KEY}` || 'https://sepolia.infura.io/v3/YOUR-PROJECT-ID'
    },
    server: {
        port: PORT
    }

}