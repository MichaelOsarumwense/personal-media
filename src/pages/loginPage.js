import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginLayout from '../components/layout/loginLayout';
import LoaderComponent from '../components/loader/loader';
import LoginForm from '../components/login/loginForm';
import { setToken } from '../utils/windowsHelper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url = process.env.REACT_APP_URL;

function LoginPage() {
  const history = useHistory();
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  let loginHandler = async (data) => {
    try {
      setSpinnerLoading(true);
      const generateToken = await fetch(`${url}/users/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!generateToken.ok) {
        setSpinnerLoading(false);
        const errorMessage = await generateToken.json();
        toast.error(errorMessage.error, {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      const jsonResponse = await generateToken.json();
      setToken('access_token', jsonResponse.token);
      history.replace('/');
      toast.success('Login successful', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      setSpinnerLoading(false);
      console.error('Login Error:', error);
      toast.error('An error occurred while logging in.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      <LoginLayout linkText={'Register'} linkRoute={'/register'}>
        <div className="content-w3ls">
          <div className="content-bottom">
            <LoginForm loginUser={loginHandler} />
            <LoaderComponent spinnerLoading={spinnerLoading} />
            <div className="text-center icon">
              <span>
                Private media lets you share your thoughts and experiences without having to worry
                about anyone snooping in your business.
              </span>
            </div>
          </div>
        </div>
      </LoginLayout>
    </div>
  );
}

export default LoginPage;
