import express from "express"
import dotenv from "dotenv"
import connectDB from "./Configs/ConnectDB.js"
import authRouter from "./Routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./Routes/user.route.js"
import assistantRouter from "./Routes/assistant.route.js"


const app = express()

const privateCors = 
cors({
  origin: [
    "http://localhost:5173"
  ],
  credentials: true
});

const publicCors = 
cors({
  origin: "*",
});



app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.json("Hello from server")
})

app.use("/api/auth",privateCors,authRouter)
app.use("/api/user",privateCors,userRouter)
app.use("/api/assistant",publicCors,assistantRouter)
const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
    connectDB()
})