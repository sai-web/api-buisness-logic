import express, { Request, Response } from 'express'
import { login, registration } from '../../index'

import { Router as OauthRouter } from './oauth'
import { Router as TwoFactorRouter } from './two-factor-auth'

import { Csrf_Token } from '../../index'
import jwt from 'jsonwebtoken'
import { csrf_token_secret } from '../../config/environment_variables'

//initiating the AuthRouter
export const Router = express.Router()

//the router middlewares within auth
Router.use('/oauth2', OauthRouter)
Router.use('/totp', TwoFactorRouter)

//initiating the csrf token and sending it to the client
Router.get('/csrf', (req: Request, res: Response) => {
    var _csrf = Csrf_Token({ username: req.body.username })
    res.statusCode = 200
    res.json({
        _csrf,
        expiration: 86400
    })
})

//login route that will send access_token and refresh token
Router.post('/login', (req: Request, res: Response) => {
    jwt.verify(`${req.query._csrf}`, csrf_token_secret, (err, data) => {
        if (!err) {
            login({
                username: req.body.username,
                password: req.body.password,
                prisma: req.prisma
            }, res, req)
        } else res.status(400).json({ status: "invalid csrf" })
    })
})

//register route that will add user creds to the database.
//note validate the creds in the front-end repo
Router.post('/register', (req: Request, res: Response) => {
    registration({
        username: req.body.username,
        password: req.body.password,
        prisma: req.prisma
    }, res)
})