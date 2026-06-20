import express from "express"
import { isAuth } from "../Middleware/isAuth.js"
import { createOrder, verifyBilling } from "../Controllers/billing.controller.js"

const billingrouter = express.Router()

billingrouter.post("/order",isAuth,createOrder)
billingrouter.post("/verify",isAuth,verifyBilling)

export default billingrouter