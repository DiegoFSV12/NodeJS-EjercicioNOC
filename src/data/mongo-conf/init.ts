import mongoose from 'mongoose';

interface ConnectionsOptions{
    mongoURL: string;
    dbName: string;
}

export class MongoDatabase{
    static async connect(options:ConnectionsOptions){
        const {mongoURL,dbName}=options;
        try {
            await mongoose.connect(mongoURL,{
                dbName:dbName,
            });
            console.log('Mongo connected');
            return true;
        } catch (error) {
            console.log('Mongo connection error');
            throw error;
        }
    }
}