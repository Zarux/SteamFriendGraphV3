import { useEffect } from "react"

type Props = {
    sigma?: any,
    markedNode?: string
    timeout: number
    defaultColor?: string
}

const SigmaColors = ({sigma, markedNode, timeout, defaultColor}: Props) => {

    useEffect(() => {
        colorNodes(sigma, markedNode).then(() => {
            sigma.graph.nodes().forEach((n: SigmaNode) => {
                n.originalColor = n.color;
            });
        })
    }, [markedNode])

    useEffect(() => {
        setTimeout(async () => {
            await colorNodes(sigma, markedNode)
            sigma.graph.nodes().forEach((n: SigmaNode) => {
                n.originalColor = n.color;
            });
            sigma.graph.edges().forEach((e: SigmaEdge) => {
                e.originalColor = e.color;
            });
        }, timeout)
    }, [timeout])

    useEffect(() => {
        colorNodes(sigma, markedNode, defaultColor)
    }, [sigma])

    return null
}

const colorNodes = async (sigma: any, markedNode?: string, def?: string) => {
    if(def){
        sigma.graph.nodes().forEach((n: SigmaNode) => {
            if(n.id === markedNode){
                n.color = "rgb(200,68,68)"
            }else{
                n.color = def
            }
        })
        sigma.refresh()
        return
    }

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
        if(n.id === markedNode){
            n.color = `rgb(${200}, ${Math.ceil(g/2)}, ${Math.ceil(g/2)})`
        }else{
            n.color = `rgb(${r}, ${g}, ${b})`
        }
    })
    sigma.refresh()
    return null
}

export default SigmaColors
