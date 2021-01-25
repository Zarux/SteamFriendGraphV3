import React from "react";
import {
    Sigma,
    SigmaEnableWebGL,
    RelativeSize,
    Filter
} from 'react-sigma'
import ForceLink from 'react-sigma/lib/ForceLink'
import {useState, useEffect} from "react"
import {GSettings, Labels} from "../../types";


type Props = {
    graph: SigmaGraph,
    labels: Labels,
    settings: GSettings
    rootId?: string
}

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

type UpdateProps = {
    sigma?: any,
    labels: Labels
}

type SigmaColorProps = {
    sigma?: any,
    rootId?: string
}

const colorNodes = (sigma: any, rootId?: string) => {
    sigma.graph.nodes().forEach((n: SigmaNode) => {
        if (rootId !== undefined && n.id === rootId){
            n.color = "#ff0000"
        }
    })
    sigma.refresh()
}

const SigmaColors = ({sigma, rootId}: SigmaColorProps) => {
    useEffect(() => {
        colorNodes(sigma, rootId)
    }, [sigma, rootId])
    colorNodes(sigma, rootId)
    return null
}

const UpdateLabels = ({sigma, labels}: UpdateProps) => {
    useEffect(() => {
        sigma.graph.nodes().forEach((n: SigmaNode) => {
            if (labels[n.id]) {
                n.label = "" + labels[n.id]
            }
        })
        sigma.refresh()
    }, [sigma, labels])
    return null
}

const GraphArea = ({graph, labels, settings, rootId}: Props) => {
    if (!graph.nodes.length && !graph.edges.length) {
        return <div/>
    }

    return (
        <Sigma
            renderer="webgl"
            graph={graph}
            settings={{
                drawEdges: true,
                clone: false,
                scalingMode: "outside",
                batchEdgesDrawing: true,
                immutable: false,
                verbose: true,
                defaultLabelColor: "#AAAAAA",
                defaultNodeColor: "#74C365",
                defaultEdgeColor: "#888",
                edgeColor: "default",
                maxNodeSize: 15,
                minNodeSize: 2,
            }}
            style={{
                width: "90%",
                height: "98vh",
            }}
        >
            <SigmaEnableWebGL/>
            <RelativeSize initialSize={2}/>

            <ForceLink
                barnesHutOptimize={true}
                worker={true}
                strongGravityMode={false}
                gravity={0.6}
                randomize="globally"
                linLogMode={false}
                easing="linear"
                iterationsPerRender={1}
            />
            <Filter nodesBy={function (this: any, n: SigmaNode) {
                return this.degree(n.id) >= (settings.minDegrees || 2);
            }}/>
            <UpdateLabels labels={labels}/>
            <SigmaColors rootId={rootId} />
        </Sigma>
    )
}

export default GraphArea