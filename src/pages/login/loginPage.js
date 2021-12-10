// eslint-disable-next-line

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginLayout from '../../components/layout/formLayout';
import LoaderComponent from '../../components/loader/loader';
import LoginForm from '../../components/login/loginForm';

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
				return generateToken.text().then((result) => Promise.reject(result));
			} else {
				const jsonResponse = await generateToken.json();
				console.log('Success:', jsonResponse);
				window.localStorage.setItem('access_token', jsonResponse.token);
			}

			const authenticateUser = await fetch('users/me', {
				headers: { Authorization: localStorage.getItem('access_token') },
			});

			if (authenticateUser.error) {
				console.error('Error:', authenticateUser.error);
				setSpinnerLoading(false);
			} else {
				setSpinnerLoading(false);
				history.replace('/home');
			}
		} catch (e) {
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
