import express, { Request, Response } from 'express'
import { login, registration } from '../../index'

import { Router as OauthRouter } from './oauth'

//initiating the AuthRouter
export const Router = express.Router()

//the router middlewares within auth
Router.use('/oauth2', OauthRouter)

//initiating the csrf token and sending it to the client
Router.get('/csrf', (req: Request, res: Response) => {
    res.json({
        _csrf: req.csrfToken(),
        expiration: 24 * 60 * 60 * 1000
    })
})

//login route that will send access_token and refresh token
Router.post('/login', (req: Request, res: Response) => {
    login({
        username: req.body.username,
        password: req.body.password,
        prisma: req.prisma
    }, res, req)
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