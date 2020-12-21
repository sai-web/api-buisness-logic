import express from 'express'

import { invalidCreds } from './helper'

export const Router = express.Router()

//get all the user info
Router.post('/info', async (req, res) => {
    if (invalidCreds(req.body.info)) {
        res.statusCode = 400
        res.json({
            status: "important credentials cannot be shared"
        })
    } else {
        const info = await req.prisma.users.findOne({
            where: {
                username: req.body.domain
            },
            select: req.body.info
        })
        res.statusCode = 200
        res.json(info)
    }
})

//update user information
Router.post('/update', async (req, res) => {
    if (invalidCreds(req.body.data)) {
        res.statusCode = 400
        res.json({
            status: "important credentials cannot be shared"
        })
    } else {
        const result = await req.prisma.users.update({
            where: {
                user_id: req.body.user_id
            },
            data: req.body.data
        })
        res.statusCode = 200
        res.json(result)
    }
})