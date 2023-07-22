// eslint-disable-next-line

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginLayout from '../components/layout/loginLayout';
import UpdateUserForm from '../components/updateUser/updateUserForm';
import LoaderComponent from '../components/loader/loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
				toast.error('User update failed.', {
					position: toast.POSITION.TOP_RIGHT,
				});
				return updateUser.text().then((result) => Promise.reject(result));
			} else {
				setSpinnerLoading(false);
				history.replace('/');
				toast.success('User update success.', {
					position: toast.POSITION.TOP_RIGHT,
				});
			}
		} catch (e) {
			setSpinnerLoading(false);
			toast.error(e, {
				position: toast.POSITION.TOP_RIGHT,
			});
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
			history.replace('/');
			toast.error('Failed to delete user.', {
				position: toast.POSITION.TOP_RIGHT,
			});
			return Promise.reject('Failed to delete user');
		} else {
			setSpinnerLoading(false);
			deleteToken('access_token');
			await history.replace('/login');
			history.replace('/');
			toast.success('Success, user deleted', {
				position: toast.POSITION.TOP_RIGHT,
			});
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
