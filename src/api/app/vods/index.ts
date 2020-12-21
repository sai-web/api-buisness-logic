import express from 'express'

import { getVods, watchVod, createPost, deletePost } from '../../../index'

export const Router = express.Router()

//get all the vods
Router.get('/vods', (req, res) => {
    getVods(req.params.user_id, req.prisma)
        .then(data => res.status(200).json({ data }))
        .catch(() => res.status(404).json({ status: "couldn't get the vods" }))
})

//watch a particular vod
Router.post('/watch', (req, res) => {
    watchVod(req.body.vod_id, req.body.user_id, req.prisma)
        .then(data => res.status(200).json({ data }))
        .catch(() => res.status(400).json({ status: "couldn't set the watch param" }))
})

//create a new post
Router.post('/create', (req, res) => {
    createPost(req.body.vod_info, req.body.user_id, req.prisma)
        .then(data => res.status(200).json({ data }))
        .catch(() => res.status(400).json({ status: "failed to save the data" }))
})

//delete a post
Router.post('/delete', (req, res) => {
    deletePost(req.body.vod_id, req.body.user_id, req.prisma)
        .then(() => res.status(200).json({ status: "successful deletion" }))
        .catch(() => res.status(404).json({ status: "unsuccessful deletion" }))
})