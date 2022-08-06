import express from 'express'
import { getImage, postImage } from '../controllers/image-controller.js'

const imageRouter = express.Router()

imageRouter.post('/create', postImage)

imageRouter.get('/:id', getImage)

export default imageRouter