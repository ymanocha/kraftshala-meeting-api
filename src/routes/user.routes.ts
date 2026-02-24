import { Router } from "express"
import {
    createUserController,
    getUserController
} from "../modules/meeting/index/user.controller"
import { 
    createMeetingController,
    getMeetingController,
    listMeetingsController,
    updateMeetingController,
    deleteMeetingController
 } from "../modules/meeting/index/meeting.controller"


const router = Router()

router.post("/users", createUserController)
router.get("/users/:id",getUserController)
router.post("/meetings", createMeetingController)
router.get("/meetings",listMeetingsController)
router.get("/meetings/:id", getMeetingController)
router.put("/meetings/:id", updateMeetingController)
router.delete("/meetings/:id", deleteMeetingController)

export default router