import { PrismaClient } from '@prisma/client'

//integrations table forms a one-many relationship with the users table

interface integration {
    accountName: string | null
    accountURL: string | null
    platform: string | null
    showOnProfile: "false" | "true" | null
}

//query the integrations table to get all of your connections
export async function getIntegrations(user_id: string, prisma: PrismaClient): Promise<integration[]> {
    var result: integration[] = await prisma.integrations.findMany({
        where: {
            user_id: user_id
        },
        select: {
            accountName: true,
            accountURL: true,
            platform: true,
            showOnProfile: true
        }
    })
    return result
}