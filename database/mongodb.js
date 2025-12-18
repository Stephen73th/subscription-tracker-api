import mongoose from "mongoose";

import { DB_URI, NODE_ENV} from '../config/env.js'

if(!DB_URI){
    throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/productiion>.local')
}

const databaseConnect = async () => {
    try{
        await mongoose.connect(DB_URI)
        console.log(`MongoDb Database successfully connected in ${NODE_ENV} mode`)
    }
    catch(error){
        console.error('Error in connecting to mongodb database', error)

        process.exit(1);
    }
}


export default databaseConnect;