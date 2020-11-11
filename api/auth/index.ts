import express, { Request, Response } from 'express'
import { login, registration, Csrf_Token, emailConfirmation } from '../../index'

import { Router as OauthRouter } from './oauth'
import { Router as TwoFactorRouter } from './two-factor-auth'

import jwt from 'jsonwebtoken'
import { email_token_secret } from '../../config/environment_variables'

//initiating the AuthRouter
export const Router = express.Router()

//the router middlewares within auth
Router.use('/oauth2', OauthRouter)
Router.use('/totp', TwoFactorRouter)

//initiating the csrf token and sending it to the client
Router.post('/csrf', (req: Request, res: Response) => {
    var _csrf = Csrf_Token({ access_token: req.body.access_token })
    res.statusCode = 200
    res.json({
        _csrf,
        expiration: 86400
    })
})

//login route that will send access_token and refresh token
Router.post('/login', (req: Request, res: Response) => {
    if (req.query.token) {
        jwt.verify(`${req.query.token}`, email_token_secret, (err, data: any) => {
            if (!err) {
                emailConfirmation(data.username, req.prisma)
                    .then(() => {
                        login({
                            username: req.body.username,
                            password: req.body.password,
                            prisma: req.prisma
                        }, res, req)
                    })
            } else res.status(400).json({ status: "email could not be confirmed" })
        })
    } else {
        login({
            username: req.body.username,
            password: req.body.password,
            prisma: req.prisma
        }, res, req)
    }
})

//register route that will add user creds to the database.
//note validate the creds in the front-end repo
Router.post('/register', (req: Request, res: Response) => {
    registration({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        prisma: req.prisma
    }, res)
})