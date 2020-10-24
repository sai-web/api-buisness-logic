import { PrismaClient, users } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { UsernameNotFound } from '../Errors/UsernameNotFound'

//imp note we are not validating username and password on the backend so do it on the front-end

interface user {
    username: string
    password: string
    prisma: PrismaClient
}

// var prisma = new PrismaClient()

export function login(param: user): void {
    findUser(param.username, param.prisma)
        .then(data => {
            if (data !== null) {
                if (data.password) {    //make sure the password is not null
                    checkCreds(param.password, data.password)   //checks whether the passwords match
                        .then(data => {
                            if (data) console.log("successful login")
                            else throw new UsernameNotFound()   //custom error object
                        })
                        .catch(err => console.log({ //returns an error object
                            type: err.name,
                            message: err.message
                        }))
                }
            } else throw new UsernameNotFound() //custom error object
        })
        .catch(err => console.log({ //returns an error object
            type: err.name,
            message: err.message
        }))
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