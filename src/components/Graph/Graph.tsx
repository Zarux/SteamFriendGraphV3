import React, {useContext, useEffect} from "react";
import {useState} from "react"
import GraphSettings from "./GraphSettings/GraphSettings";
import GraphArea from "./GraphArea/GraphArea";
import {AppContext} from "../../App";
import {
    Labels,
    ResponseMessage,
    GSettings,
    FriendGraph,
    FriendProfiles,
    ProgressStatus
} from "../../types/types";
import GraphFriends from "./GraphFriends/GraphFriends";

const defaultSettings: GSettings = {
    minDegrees: 2,
    scalingMode: "outside",
    iterationsPerRender: 1,
    timeoutMultiplier: 2,
    gravity: 0.5,
    barnesHutTheta: 1.0,
    startingIterations: 1,
    linLogMode: false,
    strongGravityMode: false,
    background: false,
    scalingRatio: 2,
    minNodeSize: 2,
    maxNodeSize: 15
}

const Graph = () => {
    const context = useContext(AppContext)
    const [lastSearch, setLastSearch] = useState("")
    const [rootId, setRootId] = useState("")
    const [graphData, setGraphData] = useState<SigmaGraph>({nodes: [], edges: []})
    const [labels, setLabels] = useState<Labels>({})
    const [gSettings, setGSettings] = useState<GSettings>(defaultSettings)
    const [tempGSettings, setTempGSettings] = useState<GSettings>(defaultSettings)
    const [friendProfiles, setFriendProfiles] = useState<FriendProfiles>({})
    const [focusedProfile, setFocusedProfile] = useState("")
    const [progress, setProgress] = useState<ProgressStatus>({})
    const [graphRendered, setGraphRendered] = useState(false)

    if (context.ws) {
        context.ws.onmessage = (event: MessageEvent) => {
            const data: ResponseMessage = JSON.parse(event.data)
            if (data.endpoint === "generateGraphData") {
                if (context.ws) {
                    context.ws.send(JSON.stringify({endpoint: "generateLabels", id: ""}))
                }
                setProgress({
                    graph: {complete: false},
                    labels: {complete: false},
                    friends: {complete: true}
                })
                const gData: FriendGraph = JSON.parse(data.data)
                setFocusedProfile(gData.rootId)
                setRootId(gData.rootId)
                setGraphData({nodes: gData.nodes, edges: gData.edges})
            } else if (data.endpoint === "generateLabels") {
                const labels: Labels = JSON.parse(data.data)
                setProgress({
                    ...progress,
                    labels: {complete: true}
                })
                setLabels(labels)
            } else if (data.endpoint === "getFriendProfiles") {
                const friends: FriendProfiles = JSON.parse(data.data)
                setFriendProfiles(friends)
            }
        }
    }

    useEffect(() => {
        if (graphRendered && progress.graph) {
            setProgress({...progress, graph: {complete: true}})
        }
    }, [graphRendered])

    useEffect(() => {
        if (progress.graph?.complete && progress.labels?.complete && progress.friends?.complete) {
            setProgress({})
        }
    }, [tempGSettings])

    const onGenerate = (id: string) => {
        setGraphRendered(false)
        setGSettings(tempGSettings)
        if (id === lastSearch) {
            setProgress({
                friends: {complete: true},
                graph: {complete: false},
                labels: {complete: progress.labels === undefined || progress.labels?.complete}
            })
            return
        }
        setProgress({
            friends: {complete: false},
            labels: {complete: false},
            graph: {complete: false}
        })
        setGraphData({nodes: [], edges: []})
        if (context.url) {
            context.url.searchParams.set("id", id)
            context.url.search = context.url.searchParams.toString()
            window.history.pushState({path: context.url.toString()}, id, context.url.toString())
        }
        if (context.ws) {
            context.ws.send(JSON.stringify({endpoint: "generateGraphData", id: id}))
            setProgress({...progress, friends: {complete: false}})
            setLastSearch(id)
        }
    }

    const handleProfileHover = [
        (profileId: string) => {
            setFocusedProfile(profileId)
        },
        (profileId: string) => {
            setFocusedProfile(rootId)
        }
    ]

    return (
        <div>
            <GraphSettings
                settings={tempGSettings}
                onUserSearch={() => {
                    if(progress.friends !== undefined) {
                        setProgress({})
                    }
                }}
                onGenerate={onGenerate}
                onSettingChange={(settings: GSettings) => {
                    setGSettings({...gSettings, minDegrees: settings.minDegrees})
                    setTempGSettings(settings)
                }}
                progressStatus={progress}
            />
            <GraphArea
                graph={graphData}
                labels={labels}
                settings={gSettings}
                markedNode={focusedProfile}
                onComplete={() => {
                    setGraphRendered(true)
                }}
            />
            <GraphFriends
                friendProfiles={friendProfiles}
                onProfileHover={handleProfileHover}
            />
        </div>
    )
}

export default Graph