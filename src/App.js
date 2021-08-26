import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from "./routes/home"
import Create from "./routes/create";
import Join from "./routes/join"
import Play from "./routes/play";
import { io } from "socket.io-client"
import Replay from './routes/result';
export const socket = io("http://localhost:4000")
export default function App() {
    return (<div>
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/create" exact component={Create} />
            <Route path="/join" exact component={Join} />
            <Route path="/play/:id" exact component={Play} />
            <Route path="/replay/:result/:id/:oppenentID" exact component={Replay} />
        </BrowserRouter>
    </div>)
}