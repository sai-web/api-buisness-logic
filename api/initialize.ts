import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'

import { PrismaClient } from '@prisma/client'

import { Router as AuthRouter } from './auth/authentication'

// tweaked the index.d.ts for express to accept PrismaClient in req

const app: Express = express()
const port = 8080
var prisma: PrismaClient = new PrismaClient()

//all the additional middlewares supporting the endpoints
app.use(helmet())   //the helmet library comes along with special middlewares for security
app.use(express.json()) //convert incoming req into JSON type
app.use((req, res, next) => {   //inject prisma into the req
    req.prisma = prisma
    next()
})

//all the Routers
app.use('/auth', AuthRouter)

//start the server
app.listen(port, () => console.log(`server started at http://localhost:${port}`))