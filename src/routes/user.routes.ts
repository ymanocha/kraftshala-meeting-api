import { Router } from "express"
import {
    createUserController,
    getUserController
} from "../modules/meeting/index/user.controller"


const router = Router()

router.post("/users", createUserController)
router.get("/users/:id",getUserController)

export default router