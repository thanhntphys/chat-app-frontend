import React from 'react'
import Avatar from './Avatar'
import { useSelector } from 'react-redux';

function ChatItem(props) {
    const { name } = useSelector(state => state.users)
    return (
        <div
            style={{ animationDelay: `0.8s` }}
            className={`chat__item ${props.user === name ? "" : "other"}`}
        >
            <div className="chat__item__content">
                <div className="chat__meta">
                    <span>{props.user}</span>
                </div>
                <div className="chat__msg">{props.msg}</div>
            </div>
            <Avatar isOnline="active" image={props.image} />
        </div>
    )
}

export default ChatItem
