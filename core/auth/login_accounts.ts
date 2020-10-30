import { PrismaClient, users } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { UsernameNotFound } from '../Errors/UsernameNotFound'
import { Response } from 'express'
import jwt from 'jsonwebtoken'

//imp note we are not validating username and password on the backend so do it on the front-end

interface user {
    username: string
    password: string
    prisma: PrismaClient
}

interface Payload {
    username: string
    refresh_token?: string
}

// var prisma = new PrismaClient()

export function login(param: user, res: Response): void {
    findUser(param.username, param.prisma)
        .then(data => {
            if (data !== null) {
                if (data.password) {    //make sure the password is not null
                    checkCreds(param.password, data.password)   //checks whether the passwords match
                        .then(data => {
                            if (data) {
                                res.statusCode = 200
                                var access_token = App_Token({
                                    username: param.username
                                })
                                var refresh_token = Refresh_Token({
                                    username: param.username
                                })
                                res.json({
                                    type: "bearer",
                                    access_token,
                                    access_token_expiration: 864000,
                                    refresh_token,
                                    refresh_token_expiration: 950400
                                })
                            }
                            else throw new UsernameNotFound()   //custom error object
                        })
                        .catch(err => errorHandler(err, res))
                }
            } else throw new UsernameNotFound() //custom error object
        })
        .catch(err => errorHandler(err, res))
}

async function findUser(username: string, prisma: PrismaClient): Promise<users | null> {   //this returns a users object along with a promise allowing to run the .then()
    const result = await prisma.users.findOne({
        where: {
            domain: username.toLowerCase().replace(/ /g, '')
        }
    })
    return result   //returns a users object or null
}

async function checkCreds(password: string, hashedPassword: string): Promise<boolean> {  //this returns a boolean value and a promise allowing to run the .then()
    return bcrypt.compare(password, hashedPassword) //returns a boolean
}

function App_Token(payload: Payload): string {  //access token that will expire in 10 days
    const access_token = jwt.sign(payload, 'access token secret', {
        algorithm: "HS256",
        expiresIn: 864000
    })
    return access_token
}

function Refresh_Token(payload: Payload): string {  //access token that will expire in 11 days
    const refresh_token = jwt.sign(payload, 'refresh token secret', {
        algorithm: "HS512",
        expiresIn: 950400
    })
    return refresh_token
}

const errorHandler = (err: Error, res: Response): void => { //this will handle all errors and return the error object
    res.statusCode = 404
    res.json({
        exception: err.name,
        status: err.message
    })
}