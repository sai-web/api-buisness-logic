import express from 'express'

import { Router as activityRouter } from './activity'
import { Router as connectionRouter } from './connections'
import { Router as subscriptionRouter } from './subscription'
import { Router as userRouter } from './user'
import { Router as vodsRouter } from './vods'

//initializing the App Router
export const Router = express.Router()

//the router middlewares within app
Router.use('/activity', activityRouter)
Router.use('/connection', connectionRouter)
Router.use('/subscription', subscriptionRouter)
Router.use('/user', userRouter)
Router.use('/vod', vodsRouter)