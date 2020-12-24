import express, { Request, Response } from 'express'
import { Revoke } from '../../../index'

//initializing the Revoke Router
export const Router = express.Router()

Router.post('/', (req: Request, res: Response) => {
    let { refresh_token } = req.body
    Revoke(req, res, refresh_token)
})

