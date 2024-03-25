// eslint-disable-next-line

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
        toast.error(generateToken.statusText, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return generateToken.text().then((result) => Promise.reject(result));
      } else {
        const jsonResponse = await generateToken.json();
        setToken('access_token', jsonResponse.token);
        history.replace('/');
        toast.success('Login successful', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (e) {
      setSpinnerLoading(false);
      toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(e);
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
