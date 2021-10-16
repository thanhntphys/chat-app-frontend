import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from 'react-redux';

import loginIcon from '../../images/user.svg'
import uiImg from '../../images/login.svg'
import './Login.css'
import userLoggin from '../../redux/actions/useActions';


function Login() {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const dispatch = useDispatch()
    const regex = /^([A-z])*[^\s]\1*$/


    // login with room name, username
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && regex.test(room)) {
            dispatch(userLoggin({ name: name, room: room }))
        }
        else {
            alert(" Chatroom or Username is incorrect!")
            setRoom('')
            setName('')
        }

    }

    const handleChange = (e) => {
        e.target.name === "name" ? setName(e.target.value) : setRoom(e.target.value)
    }
    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3">
                        <img className="icon-img" src={loginIcon} alt="icon" />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicChatroom">
                                <Form.Control type="text" placeholder="Chatroom Name" name="room" onChange={handleChange} value={room} />
                            </Form.Group>

                            <Form.Group controlId="formBasicUsername">
                                <Form.Control type="text" placeholder="Username" name="name" onChange={handleChange} value={name} />
                            </Form.Group>
                            <Button variant="primary btn-block" type="submit">
                                START CHATTING
                            </Button>
                        </Form>
                    </Col>
                    <Col lg={8} md={6} sm={12}>
                        <img className="w-100" src={uiImg} alt="" />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
