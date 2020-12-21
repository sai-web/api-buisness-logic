import { feed, PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'

//create a feed specific to the user
//allows the user and followers to query for your activity
export async function createFeed(param: { type: string, message: string }, user_id: string, username: string, prisma: PrismaClient): Promise<feed> {
    var result: feed = await prisma.feed.create({
        data: {
            user_id: user_id,
            feed_id: v4(),
            username: username,
            message: param.message,
            timestamp: new Date()
        }
    })
    return result
}

//get your inbox
//have to add a datetime configuration so that it returns only the latest feed after the user was inactive
export async function getInbox(user_id: string, date: Date, feed_id: string | undefined, prisma: PrismaClient): Promise<{ result: feed[], cursor: string | null }> {
    var subscriptions: { creator_id: string }[] | string[] = await prisma.subscription_manager.findMany({
        where: {
            viewer_id: user_id
        },
        select: {
            creator_id: true
        }
    })
    subscriptions = await subscriptions.map(creator => (creator.creator_id))
    var result: feed[] = await prisma.feed.findMany({
        take: 10,
        skip: feed_id !== undefined ? 1 : 0,
        cursor: {
            feed_id
        },
        where: {
            user_id: {
                in: subscriptions
            },
            timestamp: {
                gte: date
            }
        },
        orderBy: [
            {
                timestamp: 'desc'
            }
        ]
    })
    return {
        result,
        cursor: result[9].feed_id
    }
}