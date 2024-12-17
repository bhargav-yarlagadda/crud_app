import mongoose from "mongoose";


export default async function connectToDB() {
    try{
        const uri = process.env.MONGO_URI
        await mongoose.connect(uri || "")
        console.log("Connection Established")
    }catch(e){
        console.log("couldnt connect to mongoDB")
    }
}