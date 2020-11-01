import express from 'express'

import { subscribe, unsubscribe, getSubscriptions, getViewers } from '../../../index'

export const Router = express.Router()

Router.get('/', (req, res) => {
    getSubscriptions(req.params.user_id, req.prisma)
        .then(subscriptions => res.json({
            subscriptions
        }))
})

Router.get('/viewers', (req, res) => {
    getViewers(req.params.user_id, req.prisma)
        .then(viewers => res.json({
            viewers
        }))
})

Router.post('/subscribe', (req, res) => {
    subscribe(req.body.creator, req.params.user_id, req.body.callback, req.prisma)
        .then(() => res.status(200).json({ status: "subscribed successfully" }))
        .catch(() => res.status(400).json({ status: "subscription was unsuccessful" }))
})

Router.post('/unsubscribe', (req, res) => {
    unsubscribe(req.body.creator, req.params.user_id, req.body.callback, req.prisma)
        .then(() => res.status(200).json({ status: "unsubscribed successfully" }))
        .catch(() => res.status(400).json({ status: "couldn't unsubscribe" }))
})