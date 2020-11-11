import { PrismaClient, subscription_manager } from '@prisma/client'
import { UsernameNotFound } from '../Errors/UsernameNotFound'
import { creatorInfo } from './interfaces'
import { Response } from 'express'

//subscribe to a specfic creator
export async function subscribe(user: creatorInfo, user_id: string, viewer_type: string, callback: Function, prisma: PrismaClient): Promise<void> {
    if (addSubs(user, user_id, viewer_type, prisma)) callback()
    else throw new UsernameNotFound()
}

//unsubscribe from a  creator
//have to add a previously subscribe to feature to check your previous subscription
export async function unsubscribe(user: creatorInfo, user_id: string, callback: Function, prisma: PrismaClient): Promise<void> {
    if (deleteSubs(user, user_id, prisma)) callback()
    else throw new UsernameNotFound()
}

//get all of your current subscriptions
export async function getSubscriptions(user_id: string, prisma: PrismaClient, res: Response) {
    var creator_info = await prisma.subscription_manager.findMany({
        where: {
            viewer_id: user_id
        },
        select: {
            creator_id: true,
            creator_type: true
        }
    })
    var creators = await Promise.all(creator_info.map(async (creator) => {
        var info = await prisma.users.findOne({
            where: {
                user_id: creator.creator_id
            },
            select: {
                domain: true,
                username: true,
                photo: true
            }
        })
            .then(data => {
                return {
                    ...data,
                    type: creator.creator_type
                }
            })
        return info
    }))
    res.status(200).json({ creators })
}

//get all of your current viewers
export async function getViewers(user_id: string, prisma: PrismaClient, res: Response) {
    var viewer_info = await prisma.subscription_manager.findMany({
        where: {
            creator_id: user_id
        },
        select: {
            viewer_id: true,
            viewer_type: true
        }
    })
    var viewers = await Promise.all(viewer_info.map(async (viewer) => {
        var info = await prisma.users.findOne({
            where: {
                user_id: viewer.viewer_id
            },
            select: {
                domain: true,
                username: true,
                photo: true
            }
        })
            .then(data => {
                return {
                    ...data,
                    type: viewer.viewer_type
                }
            })
        return info
    }))
    res.status(200).json({ viewers })
}


//private methods which are not exported
async function addSubs(user: creatorInfo, user_id: string, viewer_type: string, prisma: PrismaClient): Promise<subscription_manager | null> {
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
                viewer_id: user_id,
                creator_type: "notifiers",
                viewer_type
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