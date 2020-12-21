import express from 'express'
import { Router as RevokeRouter } from './revoke_tokens'

//initializing the OauthRouter
export const Router = express.Router()

//the router middlewares within oauth
Router.use('/revoke_token', RevokeRouter)