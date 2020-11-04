import express from 'express'

import { subscribe, unsubscribe, getSubscriptions, getViewers } from '../../../index'

export const Router = express.Router()

//get your subscriptions
Router.get('/', (req, res) => {
    getSubscriptions(req.params.user_id, req.prisma)
        .then(subscriptions => res.json({
            subscriptions
        }))
})

//get your viewers
Router.get('/viewers', (req, res) => {
    getViewers(req.params.user_id, req.prisma)
        .then(viewers => res.json({
            viewers
        }))
})

//subscribe to an account
Router.post('/subscribe', (req, res) => {
    subscribe(req.body.creator, req.params.user_id, req.body.callback, req.prisma)
        .then(() => res.status(200).json({ status: "subscribed successfully" }))
        .catch(() => res.status(400).json({ status: "subscription was unsuccessful" }))
})

//unsubscribe from an account
Router.post('/unsubscribe', (req, res) => {
    unsubscribe(req.body.creator, req.params.user_id, req.body.callback, req.prisma)
        .then(() => res.status(200).json({ status: "unsubscribed successfully" }))
        .catch(() => res.status(400).json({ status: "couldn't unsubscribe" }))
})