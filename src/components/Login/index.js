import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchAllUsers, updateUser } from '../../services'
import { allUsers$ } from '../../store'
import './login.css'

const emptyObject = {};

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const allUsers = useSelector(allUsers$);
    const [userDetails, setUserDetails] = useState(emptyObject);


    const handleLogin = () => {
        console.log('userDetails ', userDetails);
        const user = allUsers.filter((e) => e.email === userDetails?.email)[0];
        console.log('user ', user);
        if(user?.pass === userDetails?.pass) {
            dispatch(updateUser({
                id: user?.id,
                user: { ...user, isAuthenticated: true }
            })).then(() => {
                dispatch(fetchAllUsers())
                history.push('/')
            })
        }
    }

    return (
        <div className="wrapper">
            <Card className="login-card">
                <Card.Body className="d-flex flex-column align-items-center">
                    <h4 className="mb-30">Sign In</h4>
                    <Form.Control
                        type="email"
                        className="mb-20"
                        placeholder="Email Address"
                        value={userDetails?.email}
                        onChange={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    <Form.Control
                        type="password"
                        className="mb-20"
                        placeholder="Password"
                        value={userDetails?.pass}
                        onChange={(e) => setUserDetails((prev) => ({ ...prev, pass: e.target.value }))}
                    />
                    <div className="mb-20 forgot-section">
                        <Form.Check type="checkbox" label="Remember Me" />
                        <Button variant="link" className="links">Forget Password</Button>
                    </div>

                    <Button variant="primary" className="mb-20 sign-in-btn" onClick={handleLogin}>Sign In</Button>

                    <div className="signup-section">
                        Not a Member? 
                        <Button variant="link" className="links" onClick={() => history.push('/register')}>Register</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    )
}
