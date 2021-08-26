/*eslint-disable*/
import { useParams } from "react-router"
import "../styles/replay.css"
import { useHistory } from 'react-router-dom';
import { socket } from "../App";
import { useEffect } from "react";
export default function Replay() {
    const history = useHistory()
    const { result, id, oppenentID } = useParams()
    const handleClick = (option) => {
        switch (option) {
            case "replay":
                socket.emit("replay", id, oppenentID)
                break;
            case "quit":
                socket.emit("quit", id, oppenentID)
                break;
            default:
        }
    }
    useEffect(() => {
        socket.on("replay", () => {
            history.push(`/play/${id}`)
        })
        socket.on("quit",()=>{
            history.push("/")
        })

    }, [])
    return (<div>
        <div className="result">
            <div >
                <h3>You {result}</h3>
                <div className="replay">
                    <h4 onClick={() => handleClick("replay") }>REPLAY</h4><h4 onClick={() => handleClick("quit")}>QUIT</h4>
                </div>
            </div>

        </div>
    </div>)
}