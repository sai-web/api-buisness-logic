import express from 'express'

import { getIntegrations, connect, disconnect } from '../../../index'

export const Router = express.Router()

//get all of your integrations
Router.get('/integrations', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        getIntegrations(req.body.user_id, req.prisma)
            .then(integrations => res.status(200).json({
                integrations
            }))
            .catch(err => res.status(400).json(err))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//connect to a new platform
Router.post('/connect', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        connect(req.body.App, req.body.user_id, req.prisma)
            .then(data => res.status(200).json({
                data
            }))
            .catch(err => res.status(400).json(err))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})

//disconnect an integration
Router.post('/disconnect', (req, res) => {
    if (req.query.identifier === req.body.user_id) {
        disconnect(req.params.platform, req.body.user_id, req.prisma)
            .then(data => res.status(200).json({
                data
            }))
            .catch(err => res.status(400).json(err))
    } else res.status(401).json({ status: "unauthorised attempt to user account" })
})