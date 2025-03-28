const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize('db', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+0:00'
})

const User = sequelize.define('bot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tg_id: DataTypes.STRING,
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
}, {timestamps: true})

async function connect(){
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    // await sequelize.sync({force: true})
}


module.exports = {User, connect}