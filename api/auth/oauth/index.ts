import express from 'express'
import { Router as RevokeRouter } from './revoke_tokens'

export const Router = express.Router()

Router.use('/revoke_token', RevokeRouter)