import express from "express"
import { isAuth } from "../Middleware/isAuth.js"
import { getCurrentUser } from "../Controllers/user.controller.js"

const userRouter  = express.Router()

userRouter.get("/current-user",isAuth,getCurrentUser)

export default userRouter