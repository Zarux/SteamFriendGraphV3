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

const ENDPOINT_GENERATE_GRAPH_DATA = "generateGraphData"
const ENDPOINT_GENERATE_LABELS = "generateLabels"
const ENDPOINT_GET_FRIEND_PROFILES = "getFriendProfiles"

const defaultSettings: GSettings = {
    minDegrees: 2,
    scalingModeOutside: true,
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
    maxNodeSize: 15,
    labelThreshold: 8
}

const Graph = () => {
    const context = useContext(AppContext)
    const [graphData, setGraphData] = useState<{ graph: SigmaGraph, rootId: string, focusedProfile: string }>({
        graph: {nodes: [], edges: []},
        rootId: "",
        focusedProfile: ""
    })
    const [labels, setLabels] = useState<Labels>({})
    const [gSettings, setGSettings] = useState<{ real: GSettings, temp: GSettings }>({
        real: defaultSettings,
        temp: defaultSettings
    })
    const [friendProfiles, setFriendProfiles] = useState<FriendProfiles>({})
    const [progress, setProgress] = useState<ProgressStatus>({})
    const [graphRendered, setGraphRendered] = useState(false)
    const [searchField, setSearchField] = useState((context.url && context.url.searchParams.get("id")) || "")

    if (context.ws) {
        context.ws.onmessage = (event: MessageEvent) => {
            const data: ResponseMessage = JSON.parse(event.data)

            if (data.err) {
                alert(data.err)
                return
            }
            if (data.endpoint === ENDPOINT_GENERATE_GRAPH_DATA) {
                if (context.ws) {
                    context.ws.send(JSON.stringify({endpoint: ENDPOINT_GENERATE_LABELS, id: ""}))
                }
                setProgress({
                    graph: {complete: false},
                    labels: {complete: false},
                    friends: {complete: true}
                })
                const gData: FriendGraph = JSON.parse(data.data)
                setGraphData({
                    graph: {nodes: gData.nodes, edges: gData.edges},
                    focusedProfile: gData.rootId,
                    rootId: gData.rootId
                })
            } else if (data.endpoint === ENDPOINT_GENERATE_LABELS) {
                const labels: Labels = JSON.parse(data.data)
                setProgress({
                    ...progress,
                    labels: {complete: true}
                })
                setLabels(labels)
            } else if (data.endpoint === ENDPOINT_GET_FRIEND_PROFILES) {
                const friends: FriendProfiles = JSON.parse(data.data)
                setFriendProfiles(friends)
            }
        }
    }

    useEffect(() => {
        if (graphRendered && progress.graph) {
            setProgress({...progress, graph: {complete: true}})
            setGraphData({
                ...graphData,
                focusedProfile: graphData.rootId,
            })
        }
    }, [graphRendered])

    useEffect(() => {
        if (progress.friends?.complete) {
            setProgress({})
        }
    }, [gSettings.temp])

    const onGenerate = (id: string) => {
        setProgress({
            friends: {complete: false},
            labels: {complete: false},
            graph: {complete: false}
        })
        setGraphData({
            graph: {nodes: [], edges: []},
            rootId: "",
            focusedProfile: ""
        })
        setGraphRendered(false)
        setGSettings({...gSettings, real: gSettings.temp})
        if (context.url) {
            context.url.searchParams.set("id", id)
            context.url.search = context.url.searchParams.toString()
            window.history.pushState({path: context.url.toString()}, id, context.url.toString())
        }
        if (context.ws) {
            context.ws.send(JSON.stringify({endpoint: ENDPOINT_GENERATE_GRAPH_DATA, id: id}))
            setProgress({...progress, friends: {complete: false}})
        }
    }

    const handleProfileHover = [
        (profileId: string) => {
            setGraphData({
                ...graphData,
                focusedProfile: profileId,
            })
        },
        (profileId: string) => {
            setGraphData({
                ...graphData,
                focusedProfile: graphData.rootId,
            })
        }
    ]

    const handleUserSearch = (event?: React.ChangeEvent<HTMLInputElement>) => {
        if (event !== undefined) {
            setSearchField(event.target.value)
        }
        if (progress.friends !== undefined) {
            setProgress({})
        }
    }

    const handleProfileSearch = (steamId: string) => {
        setSearchField(steamId)
        handleUserSearch()
    }

    return (
        <div>
            <GraphSettings
                searchField={searchField}
                settings={gSettings.temp}
                onUserSearch={handleUserSearch}
                onGenerate={onGenerate}
                onSettingChange={(settings: GSettings) => {
                    setGSettings({real: {...gSettings.real, minDegrees: settings.minDegrees}, temp: settings})
                }}
                progressStatus={progress}
            />
            <GraphArea
                graph={graphData.graph}
                labels={labels}
                settings={gSettings.real}
                markedNode={graphData.focusedProfile}
                onComplete={() => {
                    setGraphRendered(true)
                }}
            />
            <GraphFriends
                friendProfiles={friendProfiles}
                onProfileHover={handleProfileHover}
                onProfileSearch={handleProfileSearch}
            />
        </div>
    )
}

export default Graph