// eslint-disable-next-line

import { useHistory } from 'react-router-dom';
import LoginLayout from '../../components/layout/formLayout';
import RegisterForm from '../../components/register/registerForm';

function RegisterPage() {
	const history = useHistory();

	let registerHandler = async (data) => {
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
						<RegisterForm registerUser={registerHandler} />
					</div>
				</div>
			</LoginLayout>
		</div>
	);
}

export default RegisterPage;
