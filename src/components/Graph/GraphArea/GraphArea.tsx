import React, {useContext, useEffect, useState} from "react";
import {
    Sigma,
    SigmaEnableWebGL,
    RelativeSize,
    Filter,
} from 'react-sigma'
import ForceLink from 'react-sigma/lib/ForceLink'
import {GSettings, Labels} from "../../../types/types";
import SigmaColors from "./SigmaComponents/SigmaColors";
import SigmaLabels from "./SigmaComponents/SigmaLabels";
import {AppContext} from "../../../App";


type Props = {
    graph: SigmaGraph,
    labels: Labels,
    settings: GSettings
    markedNode?: string,
    onComplete?: () => void
}

const highligtAdj = (nodeEvent: SigmaNodeEvent) => {
    const sigma = nodeEvent.data.renderer;
    const aNodes = new Set([
        ...sigma.graph.adjacentNodes(nodeEvent.data.node.id).map((n: SigmaNode) => n.id),
        nodeEvent.data.node.id
    ])
    console.log(aNodes)
    sigma.graph.nodes().forEach((n: SigmaNode) => {
        if (aNodes.has(n.id)) {
            n.color = n.originalColor
        } else {
            n.color = "#303332a"
        }
    })
    sigma.graph.edges().forEach((e: SigmaEdge) => {
        if (aNodes.has(e.source) && aNodes.has(e.target)) {
            e.color = e.originalColor
        } else {
            e.color = "#303332a"

        }
    })
}

const GraphArea = ({graph, labels, settings, markedNode, onComplete}: Props) => {
    const context = useContext(AppContext)
    const timeout = graph.nodes.length * settings.timeoutMultiplier
    const defColor = "rgb(0, 129, 112)"
    useEffect(() => {
        if (timeout && onComplete) {
            setTimeout(() => {
                onComplete()
            }, timeout)
        }
    }, [graph, settings])


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
                scalingMode: settings.scalingMode,
                batchEdgesDrawing: false,
                immutable: false,
                verbose: true,
                defaultLabelColor: "#AAAAAA",
                defaultNodeColor: defColor,
                defaultEdgeColor: "#2e2e2e",
                edgeColor: "default",
                maxNodeSize: settings.maxNodeSize,
                minNodeSize: settings.minNodeSize,
                zoomMax: 3
            }}
            style={{
                width: "90%",
                height: "98vh",
            }}
            onClickNode={(nodeEvent: SigmaNodeEvent) => {
                if (context.ws) {
                    context.ws.send(JSON.stringify({endpoint: "getFriendProfiles", id: nodeEvent.data.node.id}))
                }
            }}
        >
            <SigmaEnableWebGL/>
            <RelativeSize initialSize={settings.minNodeSize}/>

            <ForceLink
                barnesHutOptimize={true}
                barnesHutTheta={settings.barnesHutTheta}
                worker={true}
                strongGravityMode={settings.strongGravityMode}
                gravity={settings.gravity}
                randomize="globally"
                linLogMode={settings.linLogMode}
                iterationsPerRender={settings.iterationsPerRender}
                alignNodeSiblings={true}
                timeout={timeout}
            />
            <Filter nodesBy={function (this: any, n: SigmaNode) {
                return this.degree(n.id) >= settings.minDegrees;
            }}/>
            <SigmaLabels labels={labels}/>
            <SigmaColors markedNode={markedNode} timeout={timeout} defaultColor={defColor}/>
        </Sigma>
    )
}

export default GraphArea