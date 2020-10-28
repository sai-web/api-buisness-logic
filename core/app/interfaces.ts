export enum state {
    offline = "offline",
    online = "online",
    streaming = "STREAMING",
    chatting = "CHATTING",
    playing = "PLAYING",
    listening = "LISTENING"
}

export interface App {
    platform: string
    accountName: string
    accountURL: string
    showOnProfile: showOnProfile
}

export interface vodInfo {
    title: string
    thumbnail: string
    views: number
    published_at: Date
    type: string
    platform: string
    url: string
}

export interface creatorInfo {
    username: string
    domain: string
    photo: string
}

enum showOnProfile {
    true = "true",
    false = "false"
}