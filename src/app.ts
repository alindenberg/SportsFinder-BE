require('dotenv').config()
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
// routes
import userRoutes from './user/routes'
import eventRoutes from './events/routes'
import passwordResetRoutes from './password_reset/routes'

const port = 3000
const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token");
  res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
  next();
});

app.use(helmet())
app.use(bodyParser.json())
app.use(userRoutes)
app.use(eventRoutes)
app.use(passwordResetRoutes)


app.listen(port, () => console.log("App started on port ", port))