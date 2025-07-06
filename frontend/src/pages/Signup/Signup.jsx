import { useForm } from 'react-hook-form';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import publicWebsite from '../../publicWebsite';

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      return;
    }
    try {
      const res = await publicWebsite.post(`/api/user/register/`, {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.email,
        email: data.email,
        password: data.password
      });
      const { access, refresh } = res.data;
      localStorage.setItem(ACCESS_TOKEN, access);
      localStorage.setItem(REFRESH_TOKEN, refresh);
      navigate('/login');
    } catch (err) {
      console.error("Signup error:", err);
      setError('email', {
        type: 'manual',
        message: 'Email already in use or invalid'
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <Card className="shadow-sm p-4 w-25">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className='img-fluid' />
        </div>
        <h5 className="text-center mb-3">Create an account</h5>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              {...register('first_name', { required: 'First name is required' })}
            />
            {errors.first_name && <div className="text-danger">{errors.first_name.message}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              {...register('last_name', { required: 'Last name is required' })}
            />
            {errors.last_name && <div className="text-danger">{errors.last_name.message}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </Form.Group>

          <Form.Group className="mb-4" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              {...register('confirmPassword', { required: 'Please confirm your password' })}
            />
            {errors.confirmPassword && (
              <div className="text-danger">{errors.confirmPassword.message}</div>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>
        <div className="text-center mt-3">
          <small>
            Already have an account? <a href="/login">Sign in</a>
          </small>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
