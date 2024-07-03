import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/userRoute.js"
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js"
import connectionDB from "./utils/database.js"
import cookieParser from "cookie-parser";
dotenv.config()
const app = express()

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send("server is working")
})
//localhost:4000/api/v1/users
app.use('/api/v1/users', authRouter)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=>{
    connectionDB()
    console.log(`server is running on port ${PORT}`);
})

