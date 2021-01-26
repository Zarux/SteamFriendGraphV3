declare module "react-sigma";

type SigmaGraph = {
    nodes: SigmaNode[]
    edges: SigmaEdge[]
}

type SigmaNode = {
    id: string
    label: string
    x?: number
    y?: number
    size?: number
    color?: string
    originalColor?: string
}

type SigmaEdge = {
    id: string
    source: string
    target: string
    label?: string
    color?: string
    originalColor?: string
}

type SigmaNodeEvent = {
    type: string
    data: {
        renderer?: any
        node: SigmaNode
        captor: {
            clientX: number,
            clientY: number
        }
    }
}