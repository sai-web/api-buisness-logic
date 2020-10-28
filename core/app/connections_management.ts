import { PrismaClient } from '@prisma/client'
import { App } from './interfaces'

export async function connect(app: App, user_id: string, prisma: PrismaClient) {
    var result = await prisma.integrations.create({
        data: {
            user_id: user_id,
            platform: app.platform,
            accountName: app.platform,
            accountURL: app.accountURL,
            showOnProfile: app.showOnProfile
        }
    })
    return result
}

export async function disconnect(platform: string, user_id: string, prisma: PrismaClient) {
    var result = await prisma.integrations.deleteMany({
        where: {
            user_id: user_id,
            platform
        }
    })
    return result
}

export async function getIntegrations(user_id: string, prisma: PrismaClient) {
    var result = await prisma.integrations.findMany({
        where: {
            user_id: user_id
        }
    })
    return result
}