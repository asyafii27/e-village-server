require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes/route')
const cors = require('cors')
const apiResponse = require('./middleware/apiResponse')

app.use(express.json())
app.use(cors())
app.use(apiResponse)

app.use('/api', router)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Internal server error' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app
