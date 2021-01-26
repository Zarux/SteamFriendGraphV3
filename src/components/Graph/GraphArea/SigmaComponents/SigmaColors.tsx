import { useEffect } from "react"

type Props = {
    sigma?: any,
    rootId?: string
    timeout: number
}

const SigmaColors = ({sigma, rootId, timeout}: Props) => {
    useEffect(() => {
        setTimeout(async () => {
            await colorNodes(sigma, rootId)
            sigma.graph.nodes().forEach((n: SigmaNode) => {
                n.originalColor = n.color;
            });
            sigma.graph.edges().forEach((e: SigmaEdge) => {
                e.originalColor = e.color;
            });
        }, timeout)
    }, [rootId, sigma, timeout])
    return null
}

const colorNodes = async (sigma: any, rootId?: string) => {
    const coords: { x: number[], y: number[] } = {
        x: [],
        y: []
    }
    sigma.graph.nodes().forEach((n: SigmaNode) => {
        coords.x.push((n.x || 0))
        coords.y.push((n.y || 0))
    })

    const xLow = Math.min(-1, Math.min(...coords.x))
    const xHigh = Math.max(...coords.x)
    const yLow = Math.min(-1, Math.min(...coords.y))
    const yHigh = Math.max(...coords.y)

    const xFactor = 255 / (xHigh + Math.abs(xLow));
    const yFactor = 255 / (yHigh + Math.abs(yLow));
    sigma.graph.nodes().forEach((n: SigmaNode) => {
        const g = Math.ceil(Math.max(((n.x || 0) + Math.abs(xLow)) * xFactor, 100));
        const b = Math.ceil(Math.max(((n.y || 0) + Math.abs(yLow)) * yFactor, 100));
        const r = 0;
        n.color = `rgb(${r}, ${g}, ${b})`
    })
    sigma.refresh()
    return null
}

export default SigmaColors
