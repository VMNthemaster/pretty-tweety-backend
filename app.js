import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import backgroundRouter from './routes/background-route'
import imageRouter from './routes/image-route'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello world')
  res.end()
})

// routes
app.use('/api/bg', backgroundRouter)
app.use('/api/image', imageRouter)

const port = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(port))
  .then(() =>
    console.log(`Connected to database and listening to localhost ${port}`)
  )
  .catch((err) => console.log(err))
