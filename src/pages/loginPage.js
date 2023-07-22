import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginLayout from '../components/layout/loginLayout';
import LoaderComponent from '../components/loader/loader';
import LoginForm from '../components/login/loginForm';
import { setToken, generateUserToken } from '../utils/windowsHelper';

const url = process.env.REACT_APP_URL;

function LoginPage() {
	const history = useHistory();
	const [spinnerLoading, setSpinnerLoading] = useState(false);

	const handleLoginSuccess = (token) => {
		setToken('access_token', token);
		// Redirect to the homepage with a success message as query parameter
		history.replace('/?success=Login successful!');
	};

	const handleLoginError = (error) => {
		toast.error(error, {
			position: toast.POSITION.TOP_RIGHT,
		});
	};

	let loginHandler = async (data) => {
		try {
			setSpinnerLoading(true);
			const generateToken = await generateUserToken(url, data);

			if (!generateToken.ok) {
				setSpinnerLoading(false);
				const errorMessage = generateToken.statusText;
				handleLoginError(errorMessage);
			} else {
				const jsonResponse = await generateToken.json();
				setSpinnerLoading(false);
				handleLoginSuccess(jsonResponse.token);
			}
		} catch (e) {
			setSpinnerLoading(false);
			console.log(e);
		}
	};

	return (
		<div>
			<ToastContainer />
			<LoginLayout linkText={'Register'} linkRoute={'/register'}>
				<div className="content-w3ls">
					<div className="content-bottom">
						<LoginForm loginUser={loginHandler} />
						<LoaderComponent spinnerLoading={spinnerLoading} />
						<div className="text-center icon">
							<span>
								Private media lets you share your thoughts and experiences without
								having to worry about anyone snooping in your business.
							</span>
						</div>
					</div>
				</div>
			</LoginLayout>
		</div>
	);
}

export default LoginPage;
