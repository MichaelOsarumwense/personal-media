// eslint-disable-next-line

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginLayout from '../components/layout/formLayout';
import UpdateUserForm from '../components/updateUser/updateUserForm';
import LoaderComponent from '../components/loader/loader';
import { Modal, Button } from 'react-bootstrap';

const url = process.env.REACT_APP_URL;

function UpdateUserPage() {
	const [spinnerLoading, setSpinnerLoading] = useState(false);
	const [show, setShow] = useState(false);
	const history = useHistory();
	const [modalDeleteButton, setButtonText] = useState('Save Changes');

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const token = window.localStorage.getItem('access_token');
	const removeToken = () => window.localStorage.removeItem('access_token');

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
			return Promise.reject(e);
		}
	};

	let deleteHandler = async (data) => {
		const changeText = (text) => setButtonText(text);
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
			changeText('failed');
			return Promise.reject('Failed to delete user');
		} else {
			removeToken();
			setSpinnerLoading(false);
			history.replace('/login');
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
								onClick={handleShow}
								type="submit"
								className="btn"
							>
								Delete Account
							</button>
						</div>
					</div>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Modal heading</Modal.Title>
						</Modal.Header>
						<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={deleteHandler} id="confirmDeleteRef">
								{modalDeleteButton}
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</LoginLayout>
		</div>
	);
}

export default UpdateUserPage;
