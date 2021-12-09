// eslint-disable-next-line

import { useHistory } from 'react-router-dom';
import LoginLayout from '../../components/layout/formLayout';
import RegisterForm from '../../components/register/registerForm';

const url = process.env.REACT_APP_URL;

function RegisterPage() {
	const history = useHistory();

	let registerHandler = async (data) => {
		try {
			const createUser = await fetch(`${url}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!createUser.ok) {
				return createUser.text().then((result) => Promise.reject(result));
			} else {
				const jsonResponse = await createUser.json();
				console.log('Success:', jsonResponse);
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
						<RegisterForm registerUser={registerHandler} />
					</div>
				</div>
			</LoginLayout>
		</div>
	);
}

export default RegisterPage;
