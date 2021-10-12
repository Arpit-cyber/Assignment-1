import React from 'react'
import { Card, Form, Button, FloatingLabel } from 'react-bootstrap'
import { useHistory } from 'react-router';
import './register.css'

export const RegisterScreen = () => {
    const history = useHistory();

    return (
        <div className="wrapper">
            <Card>
                <Card.Body className="d-flex flex-column align-items-center">
                    <h4 className="mb-30">Sign Up</h4>
                    <div className="user-name-field-wrapper">
                        <FloatingLabel
                            controlId="floatingFirstName"
                            label="First Name"
                            className="mb-3 custom-input-field"
                        >
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingLastName"
                            label="Last Name"
                            className="mb-3 ml-20 custom-input-field"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                            />
                        </FloatingLabel>
                    </div>
                    <FloatingLabel
                        controlId="floatingLastName"
                        label="Email Address"
                        className="mb-3 custom-input-field"
                    >
                        <Form.Control
                            type="email"
                            placeholder="Email Address"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingLastName"
                        label="Password"
                        className="mb-3 custom-input-field"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Password"
                        />
                    </FloatingLabel>

                    <Button variant="primary" className="mb-20 mt-20 sign-in-btn">Sign Up</Button>

                    <div className="signin-section">
                        <Button variant="link" className="back-link" onClick={() => history.push('/login')}><span className="back-arrow">&larr;</span> Go Back to Login</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    )
}
