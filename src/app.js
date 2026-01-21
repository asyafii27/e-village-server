require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const residentRoutes = require('./routes/residentRoutes')
const sktmRoutes = require('./routes/sktmRoutes')
const authMiddleware = require('./middleware/authMiddleware')
const apiResponse = require('./middleware/apiResponse')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(apiResponse)

app.get('/', (req, res) => {
    res.json({ message: 'Express + Sequelize OK' })
})

const apiRouter = express.Router()

apiRouter.use('/', authRoutes)
apiRouter.use('/users', authMiddleware, userRoutes)
apiRouter.use('/residents', authMiddleware, residentRoutes)
apiRouter.use('/test-print', sktmRoutes)

app.use('/api', apiRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
