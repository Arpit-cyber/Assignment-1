import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router';
import './register.css'

export const RegisterScreen = () => {
    const history = useHistory();

    return (
        <div className="wrapper">
            <Card className="register-card">
                <Card.Body className="d-flex flex-column align-items-center">
                    <h4 className="mb-30">Sign Up</h4>
                    <div className="user-name-field-wrapper">
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            className="mb-20"
                        />
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            className="mb-20 ml-20"
                        />
                    </div>
                   <Form.Control
                        type="email"
                        placeholder="Email Address"
                        className="mb-20"
                    />
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        className="mb-20"
                    />

                    <Button variant="primary" className="mb-20 mt-20 sign-up-btn">Sign Up</Button>

                    <div className="signup-section">
                        <Button variant="link" className="back-link" onClick={() => history.push('/login')}><span className="back-arrow">&larr;</span> Go Back to Login</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    )
}
