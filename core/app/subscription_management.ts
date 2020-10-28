import { PrismaClient, subscription_manager } from '@prisma/client'
import { UsernameNotFound } from '../Errors/UsernameNotFound'
import { creatorInfo } from './interfaces'

export async function subscribe(user: creatorInfo, user_id: string, callback: Function, prisma: PrismaClient): Promise<void> {
    if (addSubs(user, user_id, prisma)) callback()
    else throw new UsernameNotFound()
}
export async function unsubscribe(user: creatorInfo, user_id: string, callback: Function, prisma: PrismaClient): Promise<void> {
    if (deleteSubs(user, user_id, prisma)) callback()
    else throw new UsernameNotFound()
}
export async function getSubscriptions(user_id: string, prisma: PrismaClient): Promise<{ creator_id: string }[]> {
    var result = await prisma.subscription_manager.findMany({
        where: {
            viewer_id: user_id
        },
        select: {
            creator_id: true
        }
    })
    return result
}
export async function getViewers(user_id: string, prisma: PrismaClient): Promise<{ viewer_id: string }[]> {
    var result = await prisma.subscription_manager.findMany({
        where: {
            creator_id: user_id
        },
        select: {
            viewer_id: true
        }
    })
    return result
}


//private methods which are not exported
async function addSubs(user: creatorInfo, user_id: string, prisma: PrismaClient): Promise<subscription_manager | null> {
    var getId = await prisma.users.findOne({
        where: {
            domain: user.domain
        },
        select: {
            user_id: true
        }
    })
    var result
    if (getId !== null) {
        result = await prisma.subscription_manager.create({
            data: {
                creator_id: getId.user_id,
                viewer_id: user_id
            }
        })
    } else result = null
    return result
}
async function deleteSubs(user: creatorInfo, user_id: string, prisma: PrismaClient): Promise<subscription_manager | null> {
    var getId = await prisma.users.findOne({
        where: {
            domain: user.domain
        },
        select: {
            user_id: true
        }
    })
    var result
    if (getId !== null) {
        result = await prisma.subscription_manager.delete({
            where: {
                creator_id_viewer_id: {
                    creator_id: getId.user_id,
                    viewer_id: user_id
                }
            }
        })
    } else result = null
    return result
}