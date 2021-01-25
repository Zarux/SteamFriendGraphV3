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
    [id: string] : {
        label: string
    }
}

export type GSettings = {
    minDegrees?: number
    scalingMode?: string
    iterationsPerRender?: number
}

export type FriendGraph = {
    nodes: SigmaNode[]
    edges: SigmaEdge[]
    rootId: string
}