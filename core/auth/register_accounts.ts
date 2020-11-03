import { PrismaClient, users } from '@prisma/client'
import { UsernameExists } from '../Errors/UsernameExists'

import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import Joi from 'joi'

import { Response } from 'express'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import { email_token_secret, email_address, email_password } from '../../config/environment_variables'

interface user {
    username: string
    password: string
    email: string
    prisma: PrismaClient
}

interface Payload {
    username: string
    refresh_token?: string
}

const schema: Joi.ObjectSchema<any> = Joi.object().keys({
    username: Joi.string().regex(/^([a-zA-Z0-9 ]{2,20})$/).min(2).max(20).required(),
    password: Joi.string().min(10).max(30).required(),
    email: Joi.string().email().required()
})

// var prisma = new PrismaClient()

export function registration(param: user, res: Response): void {   //this checks for username and then creates a new users
    schema.validateAsync({ username: param.username, password: param.password, email: param.email })
        .then(data => {
            if (!data.error) {
                var id: string = v4()
                var hashedPassword: string = hashPassword(param.password)
                usernameExists(param.username, param.prisma)
                    .then(data => {
                        if (data === "not present") {
                            addUser(id, param.username, hashedPassword, param.prisma)
                                .then(data => {
                                    res.statusCode = 201
                                    res.json(data)
                                })
                            SendEmail(param.email, { username: param.username })
                        }
                        else throw new UsernameExists() //custom error object
                    })
                    .catch(err => errorHandler(err, res))
            } else throw new UsernameExists()  //custom error object
        })
        .catch(err => errorHandler(err, res))
}

function EmailToken(payload: Payload) {
    const Csrf_token = jwt.sign(payload, email_token_secret, {
        algorithm: "HS512",
        expiresIn: 86400
    })
    return Csrf_token
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email_address,
        pass: email_password
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function SendEmail(email: string, params: { username: string }) {
    const mailToken = await EmailToken(params)
    transporter.sendMail({
        from: email_address,
        to: email,
        subject: 'Required account confirmation within 24 hours',
        text: `Hello ${params.username}, you're almost done. Now to start using your account confirm your email address within the next 24 hours!!`,
        html: `<a href="http://localhost:8080/auth/login?token=${mailToken}">confirm your email</a>`
    }, function (error, info) {
        if (error) return false
        else return true
    });
}

async function usernameExists(username: string, prisma: PrismaClient): Promise<users | "not present"> { //this is a promise hence allowing us to run the .then() after querying the database
    const result: users | "not present" = await prisma.users.findOne({
        where: {
            domain: username.toLowerCase().replace(/ /g, '')
        }
    }) || "not present" //returns a users object otherwise returns "not present"
    return result
}

async function addUser(id: string, username: string, password: string, prisma: PrismaClient): Promise<users> {    //this returns the user object which can be used to send to the front-end for proceeding further
    const user = await prisma.users.create({
        data: {
            user_id: id,
            username: username,
            domain: username.toLowerCase().replace(/ /g, ''),
            password: password,
            created_at: new Date(),
            channelInfo: "standard",
            state: "online",
            tags: "Creator and Viewer",
            description: `hey there I'm new to pulse.`,
            confirmed: 'false',
            activity: {
                create: {
                    state: "online"
                }
            }
        }
    })
    return user
}


function hashPassword(passwordToHash: string): string {  //this uses sync functions to hash the password 
    var salt = bcrypt.genSaltSync(10)   //10 character salt
    return bcrypt.hashSync(passwordToHash, salt)
}

const errorHandler = (err: Error, res: Response): void => { //handles all errors and returns the error object
    res.statusCode = 400
    res.json({
        exception: err.name,
        status: err.message
    })
}