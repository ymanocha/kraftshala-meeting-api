import express from "express"
import dotenv from "dotenv"
dotenv.config()

import "./modules/meeting/module/user.model"
import "./modules/meeting/module/meeting.model"
import { connectDB } from "./config/database"
import userRoutes from "./routes/user.routes"
import meetingRoutes from "./routes/meeting.routes"
import { errorHandler } from "./middleware/error.middleware"
import { logger } from "./middleware/logger"
const app = express()

app.use(express.json())


app.get("/",(req,res) => {
    res.send("Server is running..")
})
app.use(logger)
app.use("/api",userRoutes)
app.use("/api",meetingRoutes)
app.use(errorHandler)

connectDB()
const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`Server runningS on PORT ${PORT}`)
})

