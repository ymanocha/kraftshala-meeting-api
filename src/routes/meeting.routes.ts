import { Router } from "express"

import { 
    createMeetingController,
    getMeetingController,
    listMeetingsController,
    updateMeetingController,
    deleteMeetingController
 } from "../modules/meeting/index/meeting.controller"

const router = Router()

router.post("/meetings", createMeetingController)
router.get("/meetings",listMeetingsController)
router.get("/meetings/:id", getMeetingController)
router.put("/meetings/:id", updateMeetingController)
router.delete("/meetings/:id", deleteMeetingController)

export default router