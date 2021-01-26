import React, {useContext} from "react";
import {useState} from "react"
import GraphSettings from "./GraphSettings/GraphSettings";
import GraphArea from "./GraphArea/GraphArea";
import {AppContext} from "../../App";
import {Labels, ResponseMessage, GSettings, FriendGraph, FriendProfiles} from "../../types/types";
import GraphFriends from "./GraphFriends/GraphFriends";

const defaultSettings: GSettings = {
    minDegrees: 2,
    scalingMode: "outside",
    iterationsPerRender: 1
}

const Graph = () => {
    const context = useContext(AppContext)
    const [rootId, setRootId] = useState("")
    const [graphData, setGraphData] = useState<SigmaGraph>({nodes: [], edges: []})
    const [labels, setLabels] = useState<Labels>({})
    const [gSettings, setGSettings] = useState<GSettings>(defaultSettings)
    const [friendProfiles, setFriendProfiles] = useState<FriendProfiles>({})

    if (context.ws) {
        context.ws.onmessage = (event: MessageEvent) => {
            const data: ResponseMessage = JSON.parse(event.data)
            if (data.endpoint === "generateGraphData") {
                if (context.ws) {
                    context.ws.send(JSON.stringify({endpoint: "generateLabels", id: ""}))
                }
                const gData: FriendGraph = JSON.parse(data.data)
                setGraphData({nodes: gData.nodes, edges: gData.edges})
                setRootId(gData.rootId)
            } else if (data.endpoint === "generateLabels") {
                const labels: Labels = JSON.parse(data.data)
                setLabels(labels)
            } else if (data.endpoint === "getFriendProfiles") {
                const friends: FriendProfiles = JSON.parse(data.data)
                setFriendProfiles(friends)
            }
        }
    }

    const onGenerate = (id: string) => {
        setGraphData({nodes: [], edges: []})
        if (context.url) {
            context.url.searchParams.set("id", id)
            context.url.search = context.url.searchParams.toString()
            window.history.pushState({path: context.url.toString()}, id, context.url.toString())
        }
        if (context.ws) {
            context.ws.send(JSON.stringify({endpoint: "generateGraphData", id: id}))
        }
    }


    return (
        <div>
            <GraphSettings
                settings={gSettings}
                onGenerate={onGenerate}
                onSettingChange={(settings: GSettings) => {
                    setGSettings(settings)
                }}
            />
            <GraphArea
                graph={graphData}
                labels={labels}
                settings={gSettings}
                rootId={rootId}
            />
            <GraphFriends
                friendProfiles={friendProfiles}
            />
        </div>
    )
}

export default Graph