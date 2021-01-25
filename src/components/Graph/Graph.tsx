import React, {useContext} from "react";
import {useState} from "react"
import GraphSettings from "./GraphSettings";
import GraphArea from "./GraphArea";
import {AppContext} from "../../App";
import {Labels, ResponseMessage, GSettings, FriendGraph} from "../../types";

const Graph = () => {
    const context = useContext(AppContext)
    const [rootId, setRootId] = useState("")
    const [graphData, setGraphData] = useState<SigmaGraph>({nodes: [], edges: []})
    const [labels, setLabels] = useState<Labels>({})
    const [gSettings, setGSettings] = useState<GSettings>({})

    if (context.ws) {
        context.ws.onmessage = (event: MessageEvent) => {
            const data: ResponseMessage = JSON.parse(event.data)
            if (data.endpoint === "generateGraphData") {
                if (context.ws) {
                    context.ws.send(JSON.stringify({endpoint: "generateLabels", id: ""}))
                }
                const gData: FriendGraph = JSON.parse(data.data)
                console.log(gData)
                setGraphData({nodes: gData.nodes, edges: gData.edges})
                setRootId(gData.rootId)
            } else if (data.endpoint === "generateLabels") {
                const labels: Labels = JSON.parse(data.data)
                setLabels(labels)
            }
        }
    }

    const onGenerate = (id: string, settings: GSettings) => {
        setGSettings(settings)
        setGraphData({nodes: [], edges: []})
        if (context.ws) {
            context.ws.send(JSON.stringify({endpoint: "generateGraphData", id: id}))
        }
    }

    const onPartialUpdate = (settings: GSettings) => {
        setGSettings(settings)
    }

    return (
        <div>
            <GraphSettings
                onGenerate={onGenerate}
                onPartialUpdate={onPartialUpdate}
            />
            <GraphArea
                graph={graphData}
                labels={labels}
                settings={gSettings}
                rootId={rootId}
            />
        </div>
    )
}

export default Graph