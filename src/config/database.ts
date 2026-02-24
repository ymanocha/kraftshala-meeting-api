import { Sequelize } from "sequelize"

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "postgres",
        logging: false
    }

)

console.log("DB_PASSWORD:", process.env.DB_PASSWORD)
export default sequelize

export const connectDB = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("database connected succesfully")
    
    } catch (error) {
        console.error("database connection failed:", error)
    }
}