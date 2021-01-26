import React from 'react';
import Graph from "./components/Graph/Graph";

type AppContextProps = {
    ws: WebSocket | null
    url: URL | null
}

export const AppContext = React.createContext<AppContextProps>({
    ws: null,
    url: null
})

type Props = {
    ws: WebSocket
}

const App = ({ws}: Props) => {
    ws.onopen = () => {
        ws.send(JSON.stringify({endpoint: "ping", id: "0"}))
    }
    const windowUrl = window.location.href;
    const url = new URL(windowUrl);
    return (
        <div className="App">
            <AppContext.Provider value={{ws: ws, url: url}}>
                <Graph />
            </AppContext.Provider>
        </div>
    );
}

export default App;
