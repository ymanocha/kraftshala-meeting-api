import meeting from "../module/meeting.model";
import { Op } from "sequelize"


export const createMeeting = async (data:any)=>{
    const { startTime, endTime, userId} = data

    const conflict = await meeting.findOne({
        where:{
            userId,
            startTime:{
                [Op.lt]: endTime
            },
            endTime: {
                [Op.gt]: startTime
            }
        }
    })
    
    if(conflict){
        throw new Error("Time slot already booked")
    }
    return await meeting.create(data)
}

export const listMeetings = async (filters: any) =>{
    const where: any ={}

    if(filters.userId){
       where.userId = filters.userId
    }

    if(filters.startDate && filters.endDate)
    {
        where.startTime = {
            [Op.gte]: new Date(filters.startDate),
            [Op.lte]: new Date(filters.endDate)

        }
    }
     const page = Number(filters.page) || 1
     const limit = Number(filters.limit) || 10
     const offset = (page - 1) * limit
    
     return await meeting.findAndCountAll({
        where,
        limit,
        offset,  
        order: [["startTime", "ASC"]]
    })
}

export const getMeetingById = async (id: number) =>{
    return await meeting.findByPk(id)
}

export const updateMeeting = async(id:number, data:any)=>{
    const Meeting = await meeting.findByPk(id)
    
    if(!Meeting){
        return null
    }

    const {startTime, endTime, userId} = data

    const conflict = await meeting.findOne(({
        where :{
            userId,
            id:{
                [Op.ne]:id
            },
            startTime: {[Op.lt]:endTime},
            endTime: {[Op.gt]:startTime}
        }
    }))
    if(conflict){
        throw new Error("Time Slot already booked")
    }

    await Meeting.update(data)

    return Meeting

}

export const deleteMeeting = async (id: number)=>{
    const Meeting = await meeting.findByPk(id)
    if(!Meeting) {
      return null 
    }

     await Meeting.destroy()
     return Meeting
}