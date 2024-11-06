import { BlockchainService } from "../services/blockchain";
import { DatabaseService } from "../services/database";

async function runTests() {
    console.log('Starting tests...');
    
    // Initializing services
    const blockchainService = new BlockchainService();
    const databaseService = new DatabaseService();
    
    try {
        // Testing Web3 Integration
        console.log('\nTesting Web3 Integration:');
        const initialCount = await blockchainService.getCount();
        console.log('Initial count:', initialCount);
        
        const newCount = await blockchainService.incrementCounter();
        console.log('After increment:', newCount);
        
        // Testing MongoDB Integration
        console.log('\nTesting MongoDB Integration:');
        const user = await databaseService.createUser({
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            walletAddress: '0x123...'
        });
        console.log('Created user:', user);
        
        const users = await databaseService.getUsers();
        console.log('Total users:', users.length);
        
        console.log('\nAll tests completed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

runTests();