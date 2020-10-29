import { PrismaClient, activity } from '@prisma/client'
import { state } from './interfaces'

export async function setState(state: state, user_id: string, prisma: PrismaClient): Promise<activity> {
    var result: activity = await prisma.activity.update({
        where: {
            user_id: user_id
        },
        data: {
            state: state
        }
    })
    return result
}