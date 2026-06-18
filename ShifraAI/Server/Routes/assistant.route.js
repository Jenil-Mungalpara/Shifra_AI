import express from "express"
import { getAssistantConfig } from "../Controllers/assistant.controller.js"

const assistantRouter = express.Router()

assistantRouter.get("/config/:userId",getAssistantConfig)

export default assistantRouter