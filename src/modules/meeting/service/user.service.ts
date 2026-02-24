import User from "../module/user.model"

export const createUser = async (name: string, email: string) =>{
    return await User.create({ name, email })
}

export const getUserById = async (id: number) => {
    return await User.findByPk(id)
}

