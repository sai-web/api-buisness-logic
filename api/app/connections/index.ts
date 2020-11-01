import express from 'express'

import { getIntegrations, connect, disconnect } from '../../../index'

export const Router = express.Router()

Router.get('/integrations', (req, res) => {
    getIntegrations(req.params.user_id, req.prisma)
        .then(integrations => res.status(200).json({
            integrations
        }))
        .catch(err => res.status(400).json(err))
})

Router.post('/connect', (req, res) => {
    connect(req.body.App, req.params.user_id, req.prisma)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json(err))
})

Router.post('/disconnect', (req, res) => {
    disconnect(req.params.platform, req.params.user_id, req.prisma)
        .then(data => res.status(200).json({
            data
        }))
        .catch(err => res.status(400).json(err))
})