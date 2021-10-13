import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchAllUsers, register } from '../../services';
import './register.css'

const emptyObject = {};

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userDetails, setUserDetails] = useState(emptyObject);

    const handleRegistration = () => {
        const { fname, lname, email, pass } = userDetails;

        const user = {
            name: fname + ' ' + lname,
            email,
            pass,
            isAuthenticated: true
        }
    
        dispatch(register(user)).then(() => {
            dispatch(fetchAllUsers())
            history.push('/')
        })
    }

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
                            value={userDetails?.fname}
                            onChange={(e) => setUserDetails((prev) => ({ ...prev, fname: e.target.value }))}
                        />
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            className="mb-20 ml-20"
                            value={userDetails?.lname}
                            onChange={(e) => setUserDetails((prev) => ({ ...prev, lname: e.target.value }))}
                        />
                    </div>
                   <Form.Control
                        type="email"
                        placeholder="Email Address"
                        className="mb-20"
                        value={userDetails?.email}
                        onChange={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        className="mb-20"
                        value={userDetails?.pass}
                        onChange={(e) => setUserDetails((prev) => ({ ...prev, pass: e.target.value }))}
                    />

                    <Button variant="primary" className="mb-20 mt-20 sign-up-btn" onClick={handleRegistration}>Sign Up</Button>

                    <div className="signup-section">
                        <Button variant="link" className="back-link" onClick={() => history.push('/login')}><span className="back-arrow">&larr;</span> Go Back to Login</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>
    )
}
