import { Request, Response} from "express"
import { createMeeting, getMeetingById, listMeetings, updateMeeting, deleteMeeting} from "../service/meeting.service"


export const createMeetingController = async (req: Request, res: Response) =>{
    try{
        const{title, description,startTime,endTime,userId} = req.body

       
        if(!title || !startTime || !endTime || !userId){
            return res.status(400).json({message: "Missing Required Fields"})
        }

        if (new Date(startTime) >= new Date(endTime)){
            return res.status(400).json({
                message: "Startime must be before endtime"
            })
        }
        const meeting = await createMeeting({
            title,
            description,
            startTime,
            endTime,
            userId}
        )
        res.status(201).json(meeting)
    }catch (error: any) {
          if (error.message === "Time slot already booked") {
             return res.status(400).json({ message: error.message })
  }
          res.status(500).json({ message: "Failed to create meeting" })
} 
}

export const listMeetingsController = async (req: Request , res: Response) => {
    try{
         const meetings = await listMeetings(req.query)
         res.json(meetings)

    
    }catch(error){
        res.status(500).json({ message : "Failed to fetch meetings"})
    }
}

export const getMeetingController = async (req: Request, res: Response) =>{
      try{
        const id = Number(req.params.id)
        
        const meeting = await getMeetingById(id)

        if(!meeting){
            return res.status(404).json({message: "Meeting not found"})
        }
        res.json(meeting)
     }catch(error){
        res.status(500).json({message: "Failed to fetch meeting"})
     }
}

export const updateMeetingController = async (req: Request,res: Response) =>{
    try{
        const id = Number(req.params.id)
        const updated = await updateMeeting(id,req.body)

        if(!updated){
            return res.status(404).json({message: "Meeting not found"})
        }

        res.json(updated)
    } catch(error:any){
        if(error.message === "Time Slot already booked"){
            return res.status(400).json({message: error.message})
        }
        res.status(500).json({ message: "failed to update meeting"})
    }
}

export const deleteMeetingController = async (req: Request, res:Response)=>{
    try{
        const id = Number(req.params.id)
        const deleted = await deleteMeeting(id)

        if(!deleted){
            return res.status(404).json({message:"Meeting not found"})

        }
        res.json({message: "Meeting deleted successfully"})
    } catch(error){
        res.status(500).json({message:"Failed to delete meeting"})
    }

}