// eslint-disable-next-line

import { useHistory } from 'react-router-dom';
import LoginLayout from '../../components/layout/formLayout';
import UpdateUserForm from '../../components/updateUser/updateUserForm';

function UpdateUserPage() {
	const history = useHistory();

	let updateUserHandler = async (data) => {
		const token = window.localStorage.getItem('access_token');
		try {
			const updateUser = await fetch(`http://localhost:3001/users/me`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify(data),
			});

			if (!updateUser.ok) {
				return updateUser.text().then((result) => Promise.reject(result));
			} else {
				const jsonResponse = await updateUser.json();
				console.log('Success:', jsonResponse);
				history.replace('/');
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			<LoginLayout linkText={'Home'} linkRoute={'/home'}>
				<div className="content-w3ls">
					<div className="content-bottom">
						<UpdateUserForm UpdateUser={updateUserHandler} />
					</div>
				</div>
			</LoginLayout>
		</div>
	);
}

export default UpdateUserPage;
