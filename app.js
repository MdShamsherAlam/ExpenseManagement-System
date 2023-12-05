import express from 'express'
import color from 'colors'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoutes)



const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`server is in ${process.env.DEV_MODE} mode on Port ${PORT}`.bgCyan.white)
})