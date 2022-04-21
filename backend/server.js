const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
dotenv.config()

const database = require('./app/models/app.model')
database.mongoose.connect(process.env.DATABASE_ACCESS, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connect')
    })
    .catch((error) => {
        console.log('Database not connect', error)
    })

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({message:'welcome'})
})

require('./app/routes/app.routes')(app)

const PORT = process.env.APP_PORT || 5000
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))