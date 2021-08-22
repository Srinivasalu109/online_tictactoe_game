import { TextField,Button } from '@material-ui/core';
import { useState,useEffect } from 'react';
import { socket } from './App';
import { useHistory } from 'react-router-dom';
import "./join.css"
export default function Join(){
    const history=useHistory(null)
    const[roomName,setRoom]=useState(" ")
    function isJoin(){
        if (roomName.trim() !== "") {
        socket.emit("join-room",roomName)
        }
        else{
            alert("please type type something")
        }
    }
    useEffect(()=>{
        socket.on("join",id=>{
            history.push(`/play/${id}`)
      })
      socket.on("not-join",()=>{
          alert("room may not exist  or room may be full")
      })
    },[])
    return(<div>
   <div className="center">
       <div className="pos">
        <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e)=>{setRoom(e.target.value)}}/>
   <br/>
   <div className="b">
   <Button variant="contained" color="primary" onClick={isJoin}>Join Room</Button>
   </div>
   </div>
        </div>
    </div>)
}