import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimiter from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import csrf from 'csurf'

import { PrismaClient } from '@prisma/client'

import { Router as AuthRouter } from './auth/authentication'

import * as dotenv from 'dotenv'
dotenv.config()

// tweaked the index.d.ts for express to accept PrismaClient in req

const app: Express = express()
const port = 8080
var prisma: PrismaClient = new PrismaClient()

//security related middlewares
app.disable("x-powered-by")
app.use(helmet())   //the helmet library comes along with special middlewares for security
app.use(cors({  //enabling the cors policy to prevent foriegn websites from accessing the api
    origin: 'http://localhost',
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE']
}))
app.use(rateLimiter({   //prevent multiple requests from being sent to api from a single ip
    windowMs: 10,
    max: 10,
    message: {
        status: 429,
        message: "you have exceeded the request limit"
    }
}))
app.use(cookieParser())
app.use(csrf({ cookie: true }))

//data mutation middlewares
app.use(express.json()) //convert incoming req into JSON type
app.use((req, _, next) => {   //inject prisma into the req
    req.prisma = prisma
    next()
})

//all the Routers
app.use('/auth', AuthRouter)

//start the server
app.listen(process.env.PORT, () => console.log(`server started at http://localhost:${port}`))

/*
features to add
1) verification of incoming data to prevent sql injection :: done
2) 2FA with the speakeasy module for TOTP
3) xml attacks using libxmljs library :: not using xml processed data
4) authorization by providing roles
5) implement CSRF protection
https://dzone.com/articles/10-nodejs-security-practices
*/