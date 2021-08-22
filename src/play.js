import "./play.css"
import { socket } from "./App";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function Play() {
    const history = useHistory()
    var gameBoard = [["", "", ""],
    ["", "", ""],
    ["", "", ""]]
    const { id } = useParams()
    const [oppenentID, setOpponentID] = useState("")
    const [loading, setLoading] = useState(true)
    const [myvalue, setMyvalue] = useState("")
    const [myID, setMyID] = useState(id)
    const [isMyturn, setMyturn] = useState(false)
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(false)
    const [isallowed, setIsallowed] = useState("not-allowed")
    const [board, setBoard] = useState(gameBoard)
    function changeBoard(i, j) {
        if (isMyturn) {
            if (!navigator.onLine) {
                alert("you lose the connection!")
                return;
            }
            if (board[i][j] === "") {
                board[i][j] = myvalue
                console.log(board)
                setCount(count + 1)
            }
        }
    }
    useEffect(() => {
         if (!navigator.onLine) {
            alert("you lose the connection!")
            socket.emit("connectionLost", oppenentID)
            history.push("/")
            return;
        }
        if (flag) { 
            socket.emit("change-board", board, oppenentID, true)
            setMyturn(!isMyturn)
        }
        if (count >= 3 && isMyturn) {
            if (((board[0][0] === myvalue) && (board[0][1] === myvalue) && (board[0][2] === myvalue)) || ((board[1][0] === myvalue) && (board[1][1] === myvalue) && (board[1][2] === myvalue)) || ((board[2][0] === myvalue) && (board[2][1] === myvalue) && (board[2][2] === myvalue))) {

                socket.emit("set-looser", oppenentID)
                history.push(`/replay/${"win"}/${id}/${oppenentID}`)
            }
            else if (((board[0][0] === myvalue) && (board[1][0] === myvalue) && (board[2][0] === myvalue)) || ((board[0][1] === myvalue) && (board[1][1] === myvalue) && (board[2][1] === myvalue)) || ((board[0][2] === myvalue) && (board[1][2] === myvalue) && (board[2][2] === myvalue))) {
                socket.emit("set-looser", oppenentID)
                history.push(`/replay/${"win"}/${id}/${oppenentID}`)
            }
            else if (((board[0][0] === myvalue) && (board[1][1] === myvalue) && (board[2][2] === myvalue)) || ((board[0][2] === myvalue) && (board[1][1] === myvalue) && (board[2][0] === myvalue))) {
                socket.emit("set-looser", oppenentID)
                history.push(`/replay/${"win"}/${id}/${oppenentID}`)
            }
        }
        socket.on("start", ({ id1, id2 }) => {
            if (myID === id1) {
                setMyvalue('X')
                setOpponentID(id2)
                setMyturn(true)
            }
            else {
                setMyvalue('O')
                setOpponentID(id1)
            }
            setFlag(true)
            setIsallowed("allowed")
        })
        socket.on("changed", (change, istrue) => {
            setBoard(change)
            setMyturn(istrue)
        })
        socket.on("losser", () => {
            history.push(`/replay/${"lost"}/${id}/${oppenentID}`)
        })
        socket.on("oppenetLeft", () => {
            history.push("/")
            alert("your opponent lost connection")
        })
        setLoading(false)
    }, [count, history])
    return (
        <div className="center">
            {
                loading ? <CircularProgress color="primary" /> :
                    <div className={isallowed}>{
                    }
                        <div className="board">
                            {
                                board.map((row, i) => <div className="row">{
                                    row.map((grid, j) => {
                                        return (<div className="grid" onClick={() =>
                                            changeBoard(i, j)
                                        }><h1 className="value">{grid}</h1></div>)
                                    })
                                }</div>)
                            }
                        </div>
                    </div>
            }
        </div>

    )
}