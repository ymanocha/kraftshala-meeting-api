import { DataTypes } from "sequelize";
import sequelize from "../../../config/database";
import User from "./user.model"

const meeting = sequelize.define("Meeting", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull:false
    },
    endTime: {
         type: DataTypes.DATE,
         allowNull:false
     }

})

User.hasMany(meeting, { foreignKey: "userId" })
meeting.belongsTo(User, {foreignKey: "userId"})

export default meeting
