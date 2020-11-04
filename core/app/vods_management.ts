import { PrismaClient, vods } from '@prisma/client'
import { v4 } from 'uuid'
import { vodInfo } from './interfaces'

//create a post
//have to update your feed so that your viewers see your posts
export async function createPost(vod: vodInfo, user_id: string, prisma: PrismaClient): Promise<vods> {
    var result: vods = await uploadVod(vod, user_id, prisma)
    return result
}

//delete your posts
export async function deletePost(vod_id: string, user_id: string, prisma: PrismaClient): Promise<vods> {
    var result: vods = await removeVod(user_id, vod_id, prisma)
    return result
}

//get all your posts
export async function getVods(user_id: string, prisma: PrismaClient): Promise<vods[]> {
    var result = await prisma.vods.findMany({
        where: {
            user_id: user_id
        }
    })
    return result
}

//view a certain vod
export async function watchVod(vod_id: string, user_id: string, prisma: PrismaClient): Promise<{ viewer_id: string, vod_id: string }> {
    var result = await prisma.view_vod.create({
        data: {
            viewer_id: user_id,
            vod_id
        }
    })
    return result
}

//private methods which are not exported
async function uploadVod(vod: vodInfo, user_id: string, prisma: PrismaClient): Promise<vods> {
    var result: vods = await prisma.vods.create({
        data: {
            user_id: user_id,
            vod_id: v4(),
            title: vod.title,
            thumbnail: vod.thumbnail,
            views: vod.views,
            published_at: vod.published_at,
            type: vod.type,
            platform: vod.platform,
            url: vod.url
        }
    })
    return result
}
async function removeVod(user_id: string, vod_id: string, prisma: PrismaClient): Promise<vods> {
    var result: vods = await prisma.vods.delete({
        where: {
            user_id_vod_id: {
                user_id,
                vod_id
            }
        }
    })
    return result
}