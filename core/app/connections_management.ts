import { PrismaClient, integrations, BatchPayload } from '@prisma/client'
import { App } from './interfaces'

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

export async function disconnect(platform: string, user_id: string, prisma: PrismaClient): Promise<BatchPayload> {
    var result: BatchPayload = await prisma.integrations.deleteMany({
        where: {
            user_id: user_id,
            platform
        }
    })
    return result
}

export async function getIntegrations(user_id: string, prisma: PrismaClient): Promise<integrations[]> {
    var result: integrations[] = await prisma.integrations.findMany({
        where: {
            user_id: user_id
        }
    })
    return result
}