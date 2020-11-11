import express from 'express'

import { subscribe, unsubscribe, getSubscriptions, getViewers } from '../../../index'

export const Router = express.Router()

//get your subscriptions
Router.get('/', (req, res) => {
    getSubscriptions(req.params.user_id, req.prisma, res)
})

//get your viewers
Router.get('/viewers', (req, res) => {
    getViewers(req.params.user_id, req.prisma, res)
})

//subscribe to an account
Router.post('/subscribe', (req, res) => {
    subscribe(req.body.creator, req.params.user_id, req.body.viewer_type, () => res.status(200).json({ status: "unsubscribed successfully" }), req.prisma)
        .catch(() => res.status(400).json({ status: "subscription was unsuccessful" }))
})

//unsubscribe from an account
Router.post('/unsubscribe', (req, res) => {
    unsubscribe(req.body.creator, req.params.user_id, () => res.status(200).json({ status: "unsubscribed successfully" }), req.prisma)
        .catch(() => res.status(400).json({ status: "couldn't unsubscribe" }))
})