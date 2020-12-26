import express from 'express'

import { getIntegrations } from '../../../index'

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