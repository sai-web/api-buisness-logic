import express from 'express'

import { getInbox, createFeed, setState } from '../../../index'

export const Router = express.Router()

//get your inbox
//a few fixes to make in the core
Router.post('/inbox', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        getInbox(req.body.user_id, req.body.date, req.body.feed_id, req.prisma)
            .then(data => res.status(200).json({
                current_inbox: data
            }))
            .catch(err => res.status(400).json({ err }))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//upload a feed
//I will make this feature automatic for new posts uploaded
Router.post('/feed', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        createFeed(req.body.feed, req.body.user_id, req.params.username, req.prisma)
            .then(data => res.status(200).json({
                data
            }))
            .catch(err => res.status(400).json({ err }))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//set a new state
Router.post('/setState', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        setState(req.body.state, req.body.user_id, req.prisma)
            .then(data => res.status(200).json({
                data
            }))
            .catch(err => res.status(400).json({ err }))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})