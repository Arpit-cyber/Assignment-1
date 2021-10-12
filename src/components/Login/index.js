import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import './login.css'

export const LoginScreen = () => {
    const history = useHistory();

    return (
        <div className="wrapper">
            <Card>
                <Card.Body className="d-flex flex-column align-items-center">
                    <h4 className="mb-30">Sign In</h4>
                    <Form.Control
                        type="email"
                        className="mb-20"
                        placeholder="Email Address"
                    />
                    <Form.Control
                        type="password"
                        className="mb-20"
                        placeholder="Password"
                    />
                    <div className="mb-20 forgot-section">
                        <Form.Check type="checkbox" label="Remember Me" />
                        <Button variant="link" className="links">Forget Password</Button>
                    </div>

                    <Button variant="primary" className="mb-20 sign-in-btn">Sign In</Button>

                    <div className="signup-section">
                        Not a Member? 
                        <Button variant="link" className="links" onClick={() => history.push('/register')}>Register</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    )
}
