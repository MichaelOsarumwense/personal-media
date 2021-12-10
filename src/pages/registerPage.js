// eslint-disable-next-line

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginLayout from '../components/layout/formLayout';
import RegisterForm from '../components/register/registerForm';
import LoaderComponent from '../components/loader/loader';

const url = process.env.REACT_APP_URL;

function RegisterPage() {
	const [spinnerLoading, setSpinnerLoading] = useState(false);
	const history = useHistory();

	let registerHandler = async (data) => {
		try {
			setSpinnerLoading(true);
			const createUser = await fetch(`${url}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!createUser.ok) {
				setSpinnerLoading(false);
				return createUser.text().then((result) => Promise.reject(result));
			} else {
				setSpinnerLoading(false);
				history.replace('/');
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			<LoginLayout linkText={'Login'} linkRoute={'/'}>
				<div className="content-w3ls">
					<div className="content-bottom">
						<LoaderComponent spinnerLoading={spinnerLoading} />
						<RegisterForm registerUser={registerHandler} />
					</div>
				</div>
			</LoginLayout>
		</div>
	);
}

export default RegisterPage;
