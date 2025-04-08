const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize('db', 'root', 'yangi_parol', {
    host: 'localhost',
    dialect: 'mysql'
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