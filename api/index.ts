import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimiter from 'express-rate-limit'
import cookieParser from 'cookie-parser'

import { PrismaClient } from '@prisma/client'

import { Router as AuthRouter } from './auth/authentication'
import { Router as AppRouter } from './app'

import { port } from '../config/environment_variables'

// tweaked the index.d.ts for express to accept PrismaClient in req

const app: Express = express()
const portnumber = port
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

//data mutation middlewares
// app.use(cookieParser())
app.use(express.json()) //convert incoming req into JSON type
app.use(express.urlencoded({ extended: false })) //remove utf-8 enconding
app.use(cookieParser())
app.use((req, _, next) => {   //inject prisma into the req
    req.prisma = prisma
    next()
})

//all the Routers
app.use('/auth', AuthRouter)
app.use('/app', AppRouter)

//start the server
app.listen(portnumber, () => console.log(`server started at http://localhost:${portnumber}`))

/*
features to add
1) verification of incoming data to prevent sql injection :: done
2) 2FA with the speakeasy module for TOTP
3) xml attacks using libxmljs library :: not using xml processed data
4) authorization by providing roles
5) implement CSRF protection :: done
https://dzone.com/articles/10-nodejs-security-practices
https://levelup.gitconnected.com/how-to-implement-csrf-tokens-in-express-f867c9e95af0
http://sahatyalkabov.com/jsrecipes/#!/backend/csrf-protection-with-express
*/