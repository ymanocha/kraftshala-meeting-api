import { Request, Response} from "express"
import { createUser, getUserById} from "../service/user.service"

export const createUserController = async (req: Request, res: Response) => {
     try{
        const {name, email} = req.body
        const user = await createUser(name, email)
        res.status(201).json(user)
     }catch(error){
        res.status(500).json({ message: "failed to create user"})
     }
}

export const getUserController = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id)
        const user = await getUserById(id)

        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        
        res.json(user)
    } catch(error){
        res.status(500).json({message: "failed to fetch the user"})
    }
}