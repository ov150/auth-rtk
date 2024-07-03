import mongoose from "mongoose"

const connectionDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`database connected successfully ${conn.connection.host}`);
    } catch (error) {
        console.log('database connection failed !!', error);
    }
}

export default connectionDB;