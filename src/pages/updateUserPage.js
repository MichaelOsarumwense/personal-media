// eslint-disable-next-line

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginLayout from '../components/layout/formLayout';
import UpdateUserForm from '../components/updateUser/updateUserForm';
import LoaderComponent from '../components/loader/loader';

const url = process.env.REACT_APP_URL;

function UpdateUserPage() {
	const [spinnerLoading, setSpinnerLoading] = useState(false);
	const history = useHistory();

	let updateUserHandler = async (data) => {
		const token = window.localStorage.getItem('access_token');
		try {
			setSpinnerLoading(true);
			const updateUser = await fetch(`${url}/users/me`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify(data),
			});

			if (!updateUser.ok) {
				setSpinnerLoading(false);
				return updateUser.text().then((result) => Promise.reject(result));
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
			<LoginLayout linkText={'Home'} linkRoute={'/home'}>
				<div className="content-w3ls">
					<div className="content-bottom">
						<LoaderComponent spinnerLoading={spinnerLoading} />
						<UpdateUserForm UpdateUser={updateUserHandler} />
					</div>
				</div>
			</LoginLayout>
		</div>
	);
}

export default UpdateUserPage;
