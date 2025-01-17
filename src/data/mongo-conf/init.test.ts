import { MongoDatabase } from "./init"
import mongoose from "mongoose";

describe('init MongoDB',()=>{
    afterAll(()=>{
        mongoose.connection.close();
    })

    test('should connect to MongoDB', async()=>{
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoURL: process.env.MONGO_URL!
        });
        expect(connected).toBe(true);
    });
    test('should throw an error', async()=>{
        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME+'test'!,
                mongoURL: process.env.MONGO_URL+'test'!
            });
            expect(connected).toBe(false);
        } catch (error) {
            
        }
        
    })
})