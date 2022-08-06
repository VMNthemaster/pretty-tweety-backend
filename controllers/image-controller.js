import express from 'express'
import completeImage from '../models/completeImage'

export const postImage = async (req, res) => {
    const {tweetID, backgroundImageID, caption} = req.body

    const newImage = new completeImage({
        tweetID, backgroundImageID, caption
    })

    try {
        await newImage.save()
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
        
    }

    return res.status(201).json({success: true, newImage})
}

export const getImage = async (req, res) => {
    const {id} = req.params
    let singleImage

    try {
        singleImage = await completeImage.findById(id)
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }

    if(!singleImage){
        return res.status(200).json({success: true, message: 'Image does not exist'})
    }

    return res.status(200).json({success: true, singleImage})

}