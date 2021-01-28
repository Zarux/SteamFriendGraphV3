export type ResponseMessage = {
    endpoint: string
    status: number
    data: string
    err: string
}

export type RequestMessage = {
    endpoint: string
    id: string
}

export type Labels = {
    [id: string]: {
        label: string
    }
}

export type SteamProfile = {
    steamid: string
    personaname: string
    profileurl: string
    avatarmedium: string
    personastate: number
    timecreated: number
    realname: string
    loccountrycode: string
}

export type FriendProfiles = {
    friends?: SteamProfile[]
    profile?: SteamProfile
}

export type FriendGraph = {
    nodes: SigmaNode[]
    edges: SigmaEdge[]
    rootId: string
}


export type GSettings = {
    minDegrees: number
    timeoutMultiplier: number
    scalingModeOutside: boolean
    iterationsPerRender: number
    startingIterations: number
    gravity: number
    linLogMode: boolean
    barnesHutTheta: number
    strongGravityMode: boolean
    background: boolean
    scalingRatio: number
    minNodeSize: number
    maxNodeSize: number
    labelThreshold: number
}

type Progress = {
    complete: boolean
}

export type ProgressStatus = {
    friends?: Progress
    labels?: Progress
    graph?: Progress
}