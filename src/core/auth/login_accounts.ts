import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { UsernameNotFound } from '../Errors/UsernameNotFound'
import { Response, Request } from 'express'
import jwt from 'jsonwebtoken'

import { access_token_secret, refresh_token_secret, csrf_token_secret, build_type } from '../../config/environment_variables'

//imp note we are not validating username and password on the backend so do it on the front-end

interface user {
    username: string
    password: string
    prisma: PrismaClient
}

interface Payload {
    user_id: string
    refresh_token?: string
}

interface Csrf_Payload {
    access_token: string
}

// var prisma = new PrismaClient()

export function login(param: user, res: Response, req: Request): void {
    findUser(param.username, param.prisma)
        .then(data => {
            if (data !== null) {
                if (data.confirmed === "true") {
                    if (data.password) {    //make sure the password is not null
                        checkCreds(param.password, data.password)   //checks whether the passwords match
                            .then(valid => {
                                delete data.password
                                if (valid) {
                                    var access_token = App_Token({
                                        user_id: data.user_id
                                    })
                                    var refresh_token = Refresh_Token({
                                        user_id: data.user_id
                                    })
                                    res.statusCode = 202
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
                                        status: "token has been set",
                                        ...data
                                    })
                                }
                                else throw new UsernameNotFound()   //custom error object
                            })
                            .catch(err => errorHandler(err, res))
                    }
                } else res.status(400).json({ status: "confirm email to proceed" })
            } else throw new UsernameNotFound() //custom error object
        })
        .catch(err => errorHandler(err, res))
}

export async function emailConfirmation(username: string, prisma: PrismaClient) {
    const result = await prisma.users.update({
        where: {
            username
        },
        data: {
            confirmed: 'true'
        }
    })
    return result
}

export function App_Token(payload: Payload): string {  //access token that will expire in 10 days
    const access_token = jwt.sign(payload, access_token_secret, {
        algorithm: "HS256",
        expiresIn: 864000
    })
    return access_token
}

export function Refresh_Token(payload: Payload): string {  //access token that will expire in 11 days
    const refresh_token = jwt.sign(payload, refresh_token_secret, {
        algorithm: "HS512",
        expiresIn: 950400
    })
    return refresh_token
}

export function Csrf_Token(payload: Csrf_Payload): string {
    const Csrf_token = jwt.sign(payload, csrf_token_secret, {
        algorithm: "HS512",
        expiresIn: 864000
    })
    return Csrf_token
}

async function findUser(username: string, prisma: PrismaClient): Promise<any> {   //this returns a users object along with a promise allowing to run the .then()
    const result = await prisma.users.findOne({
        where: {
            domain: username.toLowerCase().replace(/ /g, '')
        },
        select: {
            user_id: true,
            username: true,
            domain: true,
            created_at: true,
            channelInfo: true,
            state: true,
            tags: true,
            description: true,
            confirmed: true,
            subscription: true,
            viewers: true,
            vods: true,
            password: true,
            activity: true,
            integrations: true
        }
    })
    return result   //returns a users object or null
}

async function checkCreds(password: string, hashedPassword: string): Promise<boolean> {  //this returns a boolean value and a promise allowing to run the .then()
    return bcrypt.compare(password, hashedPassword) //returns a boolean
}

const errorHandler = (err: Error, res: Response): void => { //this will handle all errors and return the error object
    res.statusCode = 404
    res.json({
        exception: err.name,
        message: err.message,
        status: 'login error'
    })
}