import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { App_Token, Refresh_Token } from '../../../index'

import { refresh_token_secret, build_type } from '../../../config/environment_variables'

//initializing the Revoke Router
export const Router = express.Router()

Router.post('/', (req: Request, res: Response) => {
    let { refresh_token: payload_refresh_token } = req.body
    jwt.verify(payload_refresh_token, refresh_token_secret, (err: any, data: any) => {    //validate the refresh token
        if (!err) {
            var access_token = App_Token({  //providing an access token
                user_id: req.body.user_id,
                refresh_token: payload_refresh_token
            })
            var refresh_token = Refresh_Token({ //providing a refresh token
                user_id: req.body.user_id,
                refresh_token: payload_refresh_token
            })
            res.statusCode = 200
            res.cookie('access_token', access_token, {
                httpOnly: true,
                secure: build_type === "production",
                maxAge: 1000 * 60 * 60 * 24 * 10
            })
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: build_type === "production",
                maxAge: 1000 * 60 * 60 * 24 * 11
            })
            res.json({
                type: "bearer",
                status: "token has been set"
            })
        } else {    //fires when you provide an invalid refresh token
            res.statusCode = 403
            res.json({
                exception: "invalid refresh token",
                status: "provide a valid refresh token otherwise hit the /auth/login endpoint to get the access token"
            })
        }
    })
})