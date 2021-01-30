import React, {useEffect, useState} from 'react';
import Graph from "./components/Graph/Graph";

type AppContextProps = {
    ws: WebSocket | null
    url: URL | null
}

export const AppContext = React.createContext<AppContextProps>({
    ws: null,
    url: null
})

const createWs = () => {
    const wsUrl = process.env.WS_URL || ""
    if (wsUrl === "") {
        alert("Missing ENV WS_URL")
    }
    return new WebSocket(wsUrl)
}

const App = () => {
    const windowUrl = window.location.href;
    const url = new URL(windowUrl);
    const [ws, setWs] = useState<WebSocket>(createWs())

    useEffect(() => {
        ws.onopen = () => {
            ws.send(JSON.stringify({endpoint: "ping", id: ""}))
            setInterval(() => {
                ws.send(JSON.stringify({endpoint: "ping", id: ""}))
            }, 60 * 1000)
        }
        ws.onclose = () => {
            setWs(createWs())
        }
    }, [ws])

    return (
        <div className="App">
            <AppContext.Provider value={{ws: ws, url: url}}>
                <Graph/>
            </AppContext.Provider>
        </div>
    );
}

export default App;
