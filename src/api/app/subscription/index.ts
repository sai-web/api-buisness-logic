import express from 'express'

import { subscribe, unsubscribe, getSubscriptions, getViewers } from '../../../index'

export const Router = express.Router()

//get your subscriptions
Router.get('/', (req, res) => {
    if (req.query.identifier === req.body.user_id) getSubscriptions(req.body.user_id, req.prisma, res)
    else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//get your viewers
Router.get('/viewers', (req, res) => {
    if (req.query.identifier === req.body.user_id) getViewers(req.body.user_id, req.prisma, res)
    else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//subscribe to an account
Router.post('/subscribe', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        subscribe(req.body.creator, req.body.user_id, req.body.viewer_type, () => res.status(200).json({ status: "subscribed successfully" }), req.prisma)
            .catch(() => res.status(400).json({ status: "subscription was unsuccessful" }))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//unsubscribe from an account
Router.post('/unsubscribe', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        unsubscribe(req.body.creator, req.body.user_id, () => res.status(200).json({ status: "unsubscribed successfully" }), req.prisma)
            .catch(() => res.status(400).json({ status: "couldn't unsubscribe" }))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})