import { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import website from '../../website';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { useNavigate } from 'react-router-dom';


const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await website.post(`/api/token/`, {
                username: formData.email,
                password: formData.password
                }
            )
            const { access, refresh } = res.data;
            localStorage.setItem(ACCESS_TOKEN, access);
            localStorage.setItem(REFRESH_TOKEN, refresh);
            navigate('/');
        } catch (error) {
            console.error("There was an error logging in!", error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
        <Card className="shadow-sm p-4 w-25">
            <div className="text-center mb-4">
            <img src={logo} alt="Logo" className='img-fluid' />
            </div>
            <h5 className="text-center mb-3">Sign in to your account</h5>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
                value={formData.email}
                onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                required
                value={formData.password}
                onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
                Sign In
            </Button>
            </Form>

            <div className="text-center mt-3">
            <small>
                Don't have an account? <a href="/signup">Sign up</a>
            </small>
            </div>
        </Card>
        </div>
    );
};

export default Signin;
