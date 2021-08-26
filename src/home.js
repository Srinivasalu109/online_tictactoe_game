import "./home.css"
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import { socket } from "./App";
export default function Home(){
  const history=useHistory(null)
    return(<div className="homeBackground">
        <div className="buttonGroup">
            <div className="first">
        <Button variant="contained" color="primary" onClick={()=>{
          history.push("/create")
        }}>
        Create Rooom
      </Button>
      </div>
      <div className="second">
      <Button variant="contained" color="secondary" onClick={()=>{
          history.push("/join")
        }}>
        Join Room
      </Button>
      </div>
      </div>
    </div>)
}