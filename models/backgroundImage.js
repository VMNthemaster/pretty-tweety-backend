import mongoose from 'mongoose'

const backgroundImageSchema = new mongoose.Schema({
    awsUrl: {
        type: String, 
        required: true
    },
    genre: {
        type: String,
        required: true
    }
})

export default mongoose.model('BackgroundImage', backgroundImageSchema)
