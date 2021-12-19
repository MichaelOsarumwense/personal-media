// eslint-disable-next-line

import { useHistory } from 'react-router-dom';
import LoginLayout from '../components/layout/loginLayout';
import ResetPasswordForm from '../components/resetPassword/resetPasswordForm';
import React, { useState } from 'react';
import LoaderComponent from '../components/loader/loader';

const url = process.env.REACT_APP_URL;

function ResetPasswordPage() {
	const [spinnerLoading, setSpinnerLoading] = useState(false);
	const history = useHistory();

	let resetPasswordHandler = async (data) => {
		try {
			setSpinnerLoading(true);
			const passwordReset = await fetch(`${url}/users/reset-password`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!passwordReset.ok) {
				setSpinnerLoading(false);
				return passwordReset.text().then((result) => Promise.reject(result));
			} else {
				setSpinnerLoading(false);
				await history.replace('/login');
			}
		} catch (e) {
			setSpinnerLoading(false);
			console.log(e);
		}
	};

	return (
		<div>
			<LoginLayout linkText={'Login'} linkRoute={'/login'}>
				<div className="content-w3ls">
					<div className="content-bottom">
						<ResetPasswordForm resetPassword={resetPasswordHandler} />
						<LoaderComponent spinnerLoading={spinnerLoading} />
					</div>
				</div>
			</LoginLayout>
		</div>
	);
}

export default ResetPasswordPage;
