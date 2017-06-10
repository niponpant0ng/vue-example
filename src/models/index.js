import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV].database, dbConfig[process.env.NODE_ENV].username, dbConfig[process.env.NODE_ENV].password, {
  host: dbConfig[process.env.NODE_ENV].host,
  dialect: dbConfig[process.env.NODE_ENV].dialect,
  logging: process.env.DB_LOGGING ? console.log : function () {}
})
let db = {}

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function (file) {
    // register model case
    if (file.indexOf('repository') === -1) {
      let model = sequelize.import(path.join(__dirname, file))
      db[model.name] = model
    // bind repository function to model
    } else {
      let modelName = file.split('.')[0]
      let repositoryFunctions = require(path.join(__dirname, file)).default

      Object.keys(repositoryFunctions).forEach(function (functionName) {
        db[modelName][functionName] = repositoryFunctions[functionName]
      })
    }
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// sequelize.sync({ force: true }).then(() => {
//   console.log('done')
// })
db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
