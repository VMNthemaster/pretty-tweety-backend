import express from 'express'
import multer from 'multer'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'
import crypto from 'crypto'
import sharp from 'sharp'
dotenv.config()
import { getBgImage } from '../controllers/background-controller.js'
import backgroundImage from '../models/backgroundImage.js'

const backgroundRouter = express.Router()

// send the bg image to aws from here
// add the function in controller folder
// we will also have a get background image required for backend

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const bucketName = process.env.S3_BUCKET_NAME
const bucketRegion = process.env.S3_BUCKET_REGION
const bucketSecretAccessKey = process.env.S3_SECRET_ACCESS_KEY
const bucketAccessKey = process.env.S3_ACCESS_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
  region: bucketRegion,
})

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex')
const imageName = randomImageName()
backgroundRouter.post(
  '/postbgimage',
  upload.single('image'),
  async (req, res) => {
    // console.log(req.file)

    // resize image
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 100, width: 100, fit: 'contain' })  // take height and width from frontend
      .toBuffer()

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: req.file.mimetype,
    }

    const command = new PutObjectCommand(params)

    await s3.send(command)

    const newBackgroundImage = new backgroundImage({
      awsUrl: `https://pretty-tweety.s3.ap-south-1.amazonaws.com/${imageName}`,
      genre: 'Nature', // convert this later
    }) 

    try {
      await newBackgroundImage.save()
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }
    // console.log(req.file)
    return res.status(201).json({ success: true, newBackgroundImage })
  }
)

backgroundRouter.get('/getbgimage', getBgImage)

export default backgroundRouter
