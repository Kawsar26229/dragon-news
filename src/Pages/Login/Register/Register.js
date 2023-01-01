import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Register = () => {
  const [error, setError] = useState('');
  const [accepted, setAccepted] = useState(false);
  const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        setError('');
        navigate('/login');
        handleUpdateUserProfile(name, photoURL);
        handleEmailVerification();
        toast.success('Please verify your email address.');
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleUpdateUserProfile = (name, photoURL) => {
    const profile = {
        displayName : name,
        photoURL : photoURL
    }
    updateUserProfile(profile)
    .then(() => {})
    .catch(e => {
        console.log(e.message);
    })
  }
  const handleEmailVerification = () => {
    verifyEmail()
    .then(() => {})
    .catch(error => {
        console.log(error.message);
    })
  }
  const handleAccepted = (event) => {
    setAccepted(event.target.checked);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group
        className='mb-3'
        controlId='formBasicEmail'>
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          placeholder='Your Name'
        />
      </Form.Group>
      <Form.Group
        className='mb-3'
        controlId='formBasicEmail'>
        <Form.Label>PhotoURL</Form.Label>
        <Form.Control
          type='text'
          name='photoURL'
          placeholder='Photo URL'
        />
      </Form.Group>
      <Form.Group
        className='mb-3'
        controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email'
          required
        />
      </Form.Group>

      <Form.Group
        className='mb-3'
        controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          placeholder='Password'
          required
        />
      </Form.Group>
      <Form.Group
        className='mb-3'
        controlId='formBasicCheckbox'>
        <Form.Check
          type='checkbox'
          onClick={handleAccepted}
          label={
            <>
              Accept <Link to='/terms'>terms and condition</Link>
            </>
          }
        />
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        disabled={!accepted}
        >
        Register
      </Button>
      <Form.Text className='text-danger'>{error}</Form.Text>
    </Form>
  );
};

export default Register;
