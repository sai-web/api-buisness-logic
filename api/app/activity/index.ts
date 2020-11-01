import express from 'express'

import { getInbox, createFeed, setState } from '../../../index'

export const Router = express.Router()

Router.get('/inbox', (req, res) => {
    getInbox(req.params.user_id, req.prisma)
        .then(data => res.status(200).json({
            current_inbox: data
        }))
        .catch(err => res.status(400).json({ err }))
})

Router.post('/feed', (req, res) => {
    createFeed(req.body.feed, req.params.user_id, req.params.username, req.prisma)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({ err }))
})

Router.post('/setState', (req, res) => {
    setState(req.body.state, req.params.user_id, req.prisma)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json({ err }))
})