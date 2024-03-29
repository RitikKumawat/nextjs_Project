import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB connected successfully")
        })
        connection.on('error',(err)=>{
            console.log("mongoDb connection error.Please make sure MongoDb is running. ",err);
            process.exit(1);
        })
    } catch (error) {
        console.log('Something is wrong:',error);
    }
}