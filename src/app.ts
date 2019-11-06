import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'

const port = 3000
const app = express()

app.use(helmet)
app.use(bodyParser.json())

app.listen(port, () => console.log("App started on port ", port))