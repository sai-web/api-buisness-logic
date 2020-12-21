import { PrismaClient, activity } from '@prisma/client'
import { state } from './interfaces'

//the activity table forms a one-one relationship with the users table

//set the current state of the client 
//the database will automatically update the users table using triggers
export async function setState(state: state, user_id: string, prisma: PrismaClient): Promise<activity> {
    var result: activity = await prisma.activity.update({
        where: {
            user_id
        },
        data: {
            state
        }
    })
    return result
}