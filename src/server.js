import Koa from 'koa'
import cors from 'kcors'
import koaBody from 'koa-body'
import router from './controllers/index'
import Sequelize from 'sequelize'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST
})
const app = new Koa()

app.use(cors({credentials: true, maxAge: 3600 * 5}))
app.use(koaBody())
app.use(router.routes())

export default app
