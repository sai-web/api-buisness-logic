import express, { Request, Response } from 'express'
import { login, registration } from '../../index'

import { Router as OauthRouter } from './oauth'

//initiating the AuthRouter
export const Router = express.Router()

//the router middlewares within auth
Router.use('/oauth2', OauthRouter)

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