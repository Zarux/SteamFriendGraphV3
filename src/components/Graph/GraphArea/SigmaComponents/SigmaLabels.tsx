import {Labels} from "../../../../types/types";
import {useEffect} from "react";

type Props = {
    sigma?: any,
    labels: Labels
}

const SigmaLabels = ({sigma, labels}: Props) => {
    useEffect(() => {
        sigma.graph.nodes().forEach((n: SigmaNode) => {
            if (labels[n.id]) {
                n.label = "" + labels[n.id]
            }
        })
        sigma.refresh()
    }, [labels])
    return null
}

export default SigmaLabels