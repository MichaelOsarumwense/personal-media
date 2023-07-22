import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginLayout from '../components/layout/loginLayout';
import ResetPasswordForm from '../components/resetPassword/resetPasswordForm';
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
				toast.error('Failed to reset password. Please try again later.', {
					position: toast.POSITION.TOP_RIGHT,
				});
				return passwordReset.text().then((result) => Promise.reject(result));
			} else {
				setSpinnerLoading(false);
				toast.success('Password reset successful! Please login with your new password.', {
					position: toast.POSITION.TOP_RIGHT,
				});
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
