import { activity, PrismaClient, users } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import { UsernameExists } from '../Errors/UsernameExists'

//imp note we are not validating username and password on the backend so do it on the front-end

interface user {
    username: string
    password: string
    prisma: PrismaClient
}

// var prisma = new PrismaClient()

export function registration(param: user): void {   //this checks for username and then creates a new users
    var id: string = v4()
    var hashedPassword: string = hashPassword(param.password)
    usernameExists(param.username, param.prisma)
        .then(data => {
            if (data === "not present") {
                addUser(id, param.username, hashedPassword, param.prisma)
                    .then(data => console.log(data))
            }
            else throw new UsernameExists() //custom error object
        })
        .catch(err => { //this returns an error object
            console.log({
                type: err.name,
                message: err.message
            })
        })
}

async function usernameExists(username: string, prisma: PrismaClient): Promise<users | "not present"> { //this is a promise hence allowing us to run the .then() after querying the database
    const result: users | "not present" = await prisma.users.findOne({
        where: {
            domain: username.toLowerCase().replace(/ /g, '')
        }
    }) || "not present" //returns a users object otherwise returns "not present"
    return result
}

async function addUser(id: string, username: string, password: string, prisma: PrismaClient): Promise<[users, activity]> {    //this returns the user object which can be used to send to the front-end for proceeding further
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
            description: `hey there I'm new to pulse.`
        }
    })
    const activity = await prisma.activity.create({
        data: {
            user_id: id,
            state: "online"
        }
    })
    return [user, activity]
}


function hashPassword(passwordToHash: string): string {  //this uses sync functions to hash the password 
    var salt = bcrypt.genSaltSync(10)   //10 character salt
    return bcrypt.hashSync(passwordToHash, salt)
}