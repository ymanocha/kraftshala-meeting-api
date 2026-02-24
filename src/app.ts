import express from "express"
import dotenv from "dotenv"
dotenv.config()

import "./modules/meeting/module/user.model"
import "./modules/meeting/module/meeting.model"
import { connectDB } from "./config/database"



const app = express()

app.use(express.json())

app.get("/",(req,res) => {
    res.send("Server is running..")
})

connectDB()
const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})

