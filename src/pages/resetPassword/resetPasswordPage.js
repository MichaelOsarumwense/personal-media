// eslint-disable-next-line

import { useHistory } from 'react-router-dom';
import LoginLayout from '../../components/layout/formLayout';
import ResetPasswordForm from '../../components/resetPassword/resetPasswordForm';

const url = process.env.REACT_APP_URL;

function ResetPasswordPage() {
	const history = useHistory();

	let resetPasswordHandler = async (data) => {
		try {
			const passwordReset = await fetch(`${url}/users/reset-password`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!passwordReset.ok) {
				return passwordReset.text().then((result) => Promise.reject(result));
			} else {
				const jsonResponse = await passwordReset.json();
				console.log('Success:', jsonResponse);
				history.replace('/');
			}
		} catch (e) {
			return Promise.reject(e);
		}
	};

	return (
		<div>
			<LoginLayout linkText={'Login'} linkRoute={'/'}>
				<div className="content-w3ls">
					<div className="content-bottom">
						<ResetPasswordForm resetPassword={resetPasswordHandler} />
					</div>
				</div>
			</LoginLayout>
		</div>
	);
}

export default ResetPasswordPage;
