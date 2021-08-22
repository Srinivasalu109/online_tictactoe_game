import { TextField, Button } from '@material-ui/core';
import "./create.css"
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { socket } from "./App";
export default function Create() {
    const [roomName, setRoomName] = useState(' ')
    const history = useHistory(null)
    function createRoom() {
        if (roomName.trim() !== "") {
            console.log(roomName.trim())
            socket.emit("create-room", roomName)
            socket.on("created", id => {
                console.log("called")
                history.push(`/play/${id}`)
            })
            socket.on("not-created", () => {
                alert("this room is already created")
            })
        }
        else {
            alert("please type something")
        }

    }
    return (<div>

        <div className="center">
            <div className="pos1">
                <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => { setRoomName(e.target.value) }} />
                <br />
                <div className="but">
                    <Button variant="contained" color="primary" onClick={createRoom}>Create Room</Button>
                </div>
            </div>
        </div>

    </div>)
}