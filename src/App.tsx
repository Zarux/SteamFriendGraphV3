import React from 'react';
import Graph from "./components/Graph/Graph";

type AppContextProps = {
    ws: WebSocket | null
    urlParams: URLSearchParams | null
}

export const AppContext = React.createContext<AppContextProps>({
    ws: null,
    urlParams: null
})

type Props = {
    ws: WebSocket
}

const App = ({ws}: Props) => {
    ws.onopen = () => {
        ws.send(JSON.stringify({endpoint: "ping", id: "0"}))
    }
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    return (
        <div className="App">
            <AppContext.Provider value={{ws: ws, urlParams: params}}>
                <Graph />
            </AppContext.Provider>
        </div>
    );
}

export default App;
