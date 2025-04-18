import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';
import {Container, Form, Button} from 'react-bootstrap';
import logo from '../images/logoCEDFwithName.png'

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () =>{
        try{
       //     const data = await ApiService.post('/auth/login', {username,password}, null);
            const data = {
                token: "sdlfkjsldfjsldkfjsldjflsdkjflskjdf",
                user: {
                    username: "tony",
                    role: "developer"
                }
            }
            dispatch(loginSuccess({user: data.user, token: data.token}));
            navigate('/');
        } catch (error){
            alert('Login failed!');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center loginContainer" style={{ height: '100vh' }}>
            <div>
                <div className='d-flex justify-content-center align-items-center mb-2' >
                    <img
                    src={logo}
                    alt="Logo"
                    style={{ height: '200px', borderRadius: '20px' }}
                    />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <Form onSubmit={handleLogin} style={{ width: '300px' }} className='loginForm ps-5 pe-5 pt-3 pb-3'>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mb-2">
                            Login
                            </Button>
                            <div className='d-flex justify-content-center align-items-center'>
                                <a href="#"style={{color: 'red'}}>Reset Password</a>
                            </div>
                        </Form>
                    </div>
                </div>
          </div>
        </Container>
      );
}

export default Login;