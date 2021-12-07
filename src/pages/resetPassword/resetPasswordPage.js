// eslint-disable-next-line

import { useHistory } from 'react-router-dom';
import LoginLayout from '../../components/layout/formLayout';
import ResetPasswordForm from '../../components/resetPassword/resetPasswordForm';

function ResetPasswordPage() {
	const history = useHistory();

	let resetPasswordHandler = async (data) => {
		try {
			const generateToken = await fetch(
				`https://backend-personal-media.herokuapp.com/users`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			if (!generateToken.ok) {
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
			} else {
				history.replace('/register');
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
						<ResetPasswordForm resetPassword={resetPasswordHandler} />
					</div>
				</div>
			</LoginLayout>
		</div>
	);
}

export default ResetPasswordPage;
