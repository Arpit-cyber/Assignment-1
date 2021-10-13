import classNames from 'classnames'
import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchAllUsers, updateUser } from '../../services'
import { allUsers$ } from '../../store'
import './login.css'

const emptyObject = {};
const emailRegex = /[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+$/;

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const allUsers = useSelector(allUsers$);
    const [userDetails, setUserDetails] = useState(emptyObject);
    const [validation, setValidation] = useState(emptyObject);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
        e.preventDefault();
        handleLogin();
        }
    };

    const handleLogin = () => {
        const { email, pass } = userDetails;

        setValidation(emptyObject)

        if(!emailRegex.test(email) || !pass) {
            setValidation({
                email: !emailRegex.test(email),
                pass: !pass
            });
        }
        else {
            const user = allUsers.filter((e) => e.email === userDetails?.email)[0];

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
    }

    return (
        <div className="wrapper">
            <Card className="login-card">
                <Card.Body className="d-flex flex-column align-items-center">
                    <h4 className="mb-30">Sign In</h4>
                    <Form.Control
                        required
                        type="email"
                        className={classNames({
                            "mb-20": !validation?.email,
                            "error-field": validation?.email,
                        })}
                        placeholder="Email Address"
                        value={userDetails?.email}
                        onChange={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value }))}
                        onKeyDown={handleKeyDown}
                    />
                    {validation?.email && <div className="error-message">Email required</div>}
                    <Form.Control
                        type="password"
                        className={classNames({
                            "mb-20": !validation?.pass,
                            "error-field": validation?.pass,
                        })}
                        placeholder="Password"
                        value={userDetails?.pass}
                        onChange={(e) => setUserDetails((prev) => ({ ...prev, pass: e.target.value }))}
                        onKeyDown={handleKeyDown}
                    />
                    {validation?.pass && <div className="error-message">Password required</div>}
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
