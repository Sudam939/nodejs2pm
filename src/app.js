import express from 'express'
import { connectDb } from './database.js'
import bodyParser from 'body-parser'
import { createCompany } from './controllers/companyController.js'

const app = express()
const port = 8000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        "name": "nodejs2pm",
        "version": "1.0.0",
        "main": "src/app.js",
    })
})

app.post("/api/company", createCompany)

app.listen(port, () => {
    console.log(`app running at [http://localhost:${port}]`)
})