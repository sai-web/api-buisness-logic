import { PrismaClient } from '@prisma/client'
import { state } from './interfaces'

export async function setState(state: state, user_id: string, prisma: PrismaClient) {
    var result = await prisma.activity.update({
        where: {
            user_id: user_id
        },
        data: {
            state: state
        }
    })
    return result
}