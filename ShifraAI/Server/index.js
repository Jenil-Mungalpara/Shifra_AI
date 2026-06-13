import express from "express"
import dotenv from "dotenv"
import connectDB from "./Configs/ConnectDB.js"
import authRouter from "./Routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./Routes/user.route.js"


const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.json("Hello from server")
})

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
    connectDB()
})