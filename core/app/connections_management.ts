import { PrismaClient, integrations, BatchPayload } from '@prisma/client'
import { App } from './interfaces'

//integrations table forms a one-many relationship with the users table

//connect to any platform
export async function connect(app: App, user_id: string, prisma: PrismaClient): Promise<integrations> {
    var result: integrations = await prisma.integrations.create({
        data: {
            platform: app.platform,
            accountName: app.platform,
            accountURL: app.accountURL,
            showOnProfile: app.showOnProfile,
            users: {
                connect: {
                    user_id
                }
            }
        }
    })
    return result
}

//disconnect from any platform
export async function disconnect(platform: string, user_id: string, prisma: PrismaClient): Promise<BatchPayload> {
    var result: BatchPayload = await prisma.integrations.deleteMany({
        where: {
            user_id: user_id,
            platform
        }
    })
    return result
}

//query the integrations table to get all of your connections
export async function getIntegrations(user_id: string, prisma: PrismaClient): Promise<integrations[]> {
    var result: integrations[] = await prisma.integrations.findMany({
        where: {
            user_id: user_id
        }
    })
    return result
}