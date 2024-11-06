import mongoose from "mongoose";
import { IUser, User } from "../models/User";
import { config } from "../configuration/config";


export class DatabaseService{

    constructor(){
        this.connect()
    }

    private async connect(){
        if(config.mongodb.uri === undefined || config.mongodb.options === undefined){
            throw new Error ("Mongodb URI is undefined")
        }

        try {
            await mongoose.connect(config.mongodb.uri,{
                ...config.mongodb.options,
                serverSelectionTimeoutMS: 30000, // 30 seconds
              })
            console.log('Connected to MongoDB successfully');
            // await mongoose.connect(config.mongodb.uri, config.mongodb.options)
            // console.log('Connected to MongoDB successfully');

            mongoose.connection.on("error", (error)=>{
                console.error('MongoDB connection error:', error);
            })

            mongoose.connection.on("disconnected",()=>{
                console.log('MongoDB disconnected. Attempting to reconnect...')
                this.connect();
            })
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
        }
    }

     // Add a disconnect method to close the connection
     private async disconnect() {
        try {
            await mongoose.connection.close();
            console.log("MongoDB connection closed.");
        } catch (error) {
            console.error("Error disconnecting from MongoDB:", error);
        }
    }

    async createUser(userData: Omit<IUser, 'createdAt'>): Promise<IUser> {
        try {
            const user = new User(userData);
            const result = await user.save();
            await this.disconnect();
            return result;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async getUsers(): Promise<IUser[]> {
        try {
            const users = await User.find().sort({ createdAt: -1 });
            await this.disconnect(); 
            return users;        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    }

}