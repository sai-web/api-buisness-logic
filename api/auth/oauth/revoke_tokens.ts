import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { login } from '../../../index'

export const Router = express.Router()

Router.post('/', (req: Request, res: Response) => {
    let { refresh_token } = req.body
    jwt.verify(refresh_token, 'refresh token secret', (err: any, data: any) => {
        if (!err) {
            console.log(data)
            login({
                username: req.body.username,
                password: req.body.password,
                prisma: req.prisma
            }, res)
        }
    })
})