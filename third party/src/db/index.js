import mongoose from "mongoose";

const connectDb= async ()=>{
    try {
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
        console.log('connected to db');
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;