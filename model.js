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

const users = [
    { id: 5,tg_id: 1, username: "toxirovvv_1", phone: "+998946280222", createdAt: "2025-03-28T12:08:25.000Z", updatedAt: "2025-03-28T12:08:25.000Z" },
    { id: 6,tg_id: 2, username: "xojiakbar2270", phone: "+998334412270", createdAt: "2025-03-28T12:09:00.000Z", updatedAt: "2025-03-28T12:09:00.000Z" },
    { id: 7,tg_id: 3, username: "toxirovvv_1", phone: "+998946280222", createdAt: "2025-03-28T12:14:06.000Z", updatedAt: "2025-03-28T12:14:06.000Z" },
    { id: 8,tg_id: 4, username: "Xurshidbekoovna", phone: "+998909927572", createdAt: "2025-03-28T12:19:20.000Z", updatedAt: "2025-03-28T12:19:20.000Z" },
    { id: 9,tg_id: 5, username: "Shaxriyorfx", phone: "+998946623554", createdAt: "2025-03-28T12:22:34.000Z", updatedAt: "2025-03-28T12:22:34.000Z" },
    { id: 10,tg_id: 6, username: null, phone: "998948803807", createdAt: "2025-03-28T12:31:31.000Z", updatedAt: "2025-03-28T12:31:31.000Z" },
    { id: 11,tg_id: 7, username: "zoxidoff", phone: "998935665206", createdAt: "2025-03-28T12:44:17.000Z", updatedAt: "2025-03-28T12:44:17.000Z" },
    { id: 12,tg_id: 8, username: "toxirovvv_1", phone: "+998946280222", createdAt: "2025-03-28T12:59:09.000Z", updatedAt: "2025-03-28T12:59:09.000Z" },
    { id: 13,tg_id: 9, username: "Miralievvv", phone: "+998974504771", createdAt: "2025-03-28T13:01:40.000Z", updatedAt: "2025-03-28T13:01:40.000Z" },
  ];

  
  
  async function connect(){
    User.bulkCreate(users)
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    // await sequelize.sync({force: true})
}


module.exports = {User, connect}