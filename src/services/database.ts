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
            await mongoose.connect(config.mongodb.uri, config.mongodb.options)
            console.log('Connected to MongoDB successfully');

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

    async createUser(userData: Omit<IUser, 'createdAt'>): Promise<IUser> {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async getUsers(): Promise<IUser[]> {
        try {
            return await User.find().sort({ createdAt: -1 });
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    }

}