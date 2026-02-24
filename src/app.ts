import express from "express"
import dotenv from "dotenv"
dotenv.config()

import "./modules/meeting/module/user.model"
import "./modules/meeting/module/meeting.model"
import { connectDB } from "./config/database"
import userRoutes from "./routes/user.routes"


const app = express()

app.use(express.json())

app.get("/",(req,res) => {
    res.send("Server is running..")
})

app.use(userRoutes)

// app.post("/users", (req, res) => {

//   res.send("POST /users reached")
// })
connectDB()
const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})

