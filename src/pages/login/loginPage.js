// eslint-disable-next-line

import { useHistory } from 'react-router-dom';
import LoginLayout from '../../components/layout/formLayout';
import LoginForm from '../../components/login/loginForm';

function LoginPage() {
	const history = useHistory();

	let loginHandler = async (data) => {
		try {
			const generateToken = await fetch(
				`https://backend-personal-media.herokuapp.com/users/login`,
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
