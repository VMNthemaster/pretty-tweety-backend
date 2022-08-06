import mongoose from 'mongoose'

const completeImageSchema = new mongoose.Schema({
    tweetID: {
        type: String,  
        required: true
    },
    backgroundImageID: {
        type: String, 
        required: true
    },
    caption: {
        type: String
    }
})

export default mongoose.model('CompleteImage', completeImageSchema)
