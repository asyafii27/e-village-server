require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const authMiddleware = require('./middleware/authMiddleware')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Express + Sequelize OK' })
})

const apiRouter = express.Router()

apiRouter.use('/', authRoutes)
apiRouter.use('/users', authMiddleware, userRoutes)

app.use('/api', apiRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
