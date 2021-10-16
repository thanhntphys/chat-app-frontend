import React from 'react'

function Avatar(props) {
    return (
        <div>
            <div className="avatar">
                <div className="avatar-img">
                    <img src={props.image} alt="#" />
                </div>
                <span className={`isOnline ${props.isOnline}`}></span>
            </div>
        </div>
    )
}

export default Avatar
