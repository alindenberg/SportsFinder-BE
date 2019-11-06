import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
// routes
import userRoutes from './user/routes'
import eventRoutes from './events/routes'

const port = 3000
const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(userRoutes)
app.use(eventRoutes)


app.listen(port, () => console.log("App started on port ", port))