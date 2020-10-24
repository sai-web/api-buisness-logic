export interface User {
    id: string
    username: string
    domain: string
    photoUrl: string
}

export interface details {
    email: string
    phone: number
    description: string
    tags: string
    viewers: Array<User>
    subscribed: Array<User>
}

export interface connections {
    integrations: Array<connectedAccount>
}

export interface activities {
    state: Array<activity>
}

export interface content {
    thumbnail: string
    title: string
    viewers: Array<string>
    platform: string
    published_at: Date
    type: string
}

export interface inbox {
    content: Array<content>
}

export interface channel {
    account: accountType
    banned: boolean
}

enum accountType {
    admin,
    general,
    premium
}

enum Status {
    offline,
    online,
    streaming = "STREAMING",
    chatting = "CHATTING",
    playing = "PLAYING",
    listening = "LISTENING"
}

type connectedAccount = {
    platform: string,
    accountName: string,
    accountURL: string,
    access_token?: string,
    refresh_token?: string,
    connected_at?: Date
}

type activity = {
    status: Status,
    platform: string,
    title: string,
    author: string,
    url: string
}