// eslint-disable-next-line

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginLayout from '../components/layout/loginLayout';
import UpdateUserForm from '../components/updateUser/updateUserForm';
import LoaderComponent from '../components/loader/loader';

import { getToken, deleteToken } from '../utils/windowsHelper';
import Modals from '../components/modal/modal';

const url = process.env.REACT_APP_URL;

function UpdateUserPage() {
	const [spinnerLoading, setSpinnerLoading] = useState(false);
	const [show, setShow] = useState(false);
	const history = useHistory();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const token = getToken();

	let updateUserHandler = async (data) => {
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
			setSpinnerLoading(false);
			console.log(e);
		}
	};

	let deleteHandler = async () => {
		setSpinnerLoading(true);
		const deleteUser = await fetch(`${url}/users/me`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});

		if (!deleteUser.ok) {
			setSpinnerLoading(false);
			return Promise.reject('Failed to delete user');
		} else {
			setSpinnerLoading(false);
			history.replace('/login');
			deleteToken('access_token');
		}
	};

	return (
		<div>
			<LoginLayout linkText={'Home'} linkRoute={'/'}>
				<div className="content-w3ls">
					<div className="content-bottom">
						<LoaderComponent spinnerLoading={spinnerLoading} />
						<UpdateUserForm UpdateUser={updateUserHandler} />
						<div className="wthree-field">
							<button
								id="deleteButton"
								onClick={() => {
									handleShow();
								}}
								type="submit"
								className="btn"
							>
								Delete Account
							</button>
						</div>
					</div>
					<Modals show={show} handleClose={handleClose} handler={deleteHandler} />
				</div>
			</LoginLayout>
		</div>
	);
}

export default UpdateUserPage;
