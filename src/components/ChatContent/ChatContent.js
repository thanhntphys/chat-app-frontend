import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Container } from "react-bootstrap";
import ChatItem from "./ChatItem";
import "./ChatContent.css"

import { userLoggout } from '../../redux/actions/useActions';


function ChatContent() {
    const { name, room } = useSelector(state => state.users)
    const [sendMsg, setSendMsg] = useState("")
    const [dataChat, setDataChat] = useState([])
    const client = useRef(null);
    const img = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
    const messagesEndRef = useRef(null)
    const dispatch = useDispatch()

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    const handleClickLeave = (e) => {
        client.current.close()
        dispatch(userLoggout())
    }

    const handleClick = (e) => {
        if (client.current.readyState !== W3CWebSocket.OPEN) {
            client.current.close()
            alert("Connect server is error!")
            dispatch(userLoggout())
        }
        if (sendMsg !== "") {
            client.current.send(JSON.stringify({
                type: "message",
                message: sendMsg,
                name: name,
            }))
        }
        setSendMsg("")
        e.preventDefault();
    }

    const handleChange = (e) => {
        setSendMsg(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (client.current.readyState !== W3CWebSocket.OPEN) {
                client.current.close()
                alert("Connect server is error!",)
                dispatch(userLoggout())
            }
            if (sendMsg !== "") {
                client.current.send(JSON.stringify({
                    type: "message",
                    message: sendMsg,
                    name: name,
                }))

                setSendMsg("")
            }
        }
    }

    useEffect(scrollToBottom, [dataChat]);

    useEffect(() => {
        client.current = new W3CWebSocket(`ws://chat-room-django-reactjs.herokuapp.com/ws/chat/${room}/`);
        client.current.onopen = () => {
            console.log('WebSocket Client Connected');
        }
        client.current.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer) {
                setDataChat(dataChat => (
                    [
                        ...dataChat,
                        {
                            msg: dataFromServer.message,
                            name: dataFromServer.name
                        }
                    ])
                )
            }
        }
    }, [])

    return (
        <Container>
            <div className="main__chatcontent">
                <div className="content__header">
                    <div className="blocks">
                        <div className="current-chatting-user">
                            <p className="text-primary">{room}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleClickLeave} className="btn btn-danger">Leave</button>
                    </div>
                </div>
                <div className="content__body">
                    <div className="chat__items">
                        {dataChat.map((itm, index) => {
                            return (
                                <ChatItem
                                    animationDelay={index + 2}
                                    key={index}
                                    user={itm.name}
                                    msg={itm.msg}
                                    image={img}
                                />
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div >
                </div>
                <div className="content__footer">
                    <div className="sendNewMessage">
                        <button className="addFiles">
                            <i className="fa fa-plus"></i>
                        </button>
                        <input
                            type="text"
                            placeholder="Type a message here"
                            name="sendMsg"
                            value={sendMsg}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                        <button className="btnSendMsg" id="sendMsgBtn" onClick={handleClick}>
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ChatContent
