import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getAvatar from '../../utils/handlers/getAvatarHandler';
import getUserHandler from '../../utils/handlers/getUserHandler';
import { pageReload } from '../../utils/windowsHelper';
import defaultImage from '../layout/images/01.png';
import ImageModals from '../modal/imageModal';

export function UserInfoLeftColumn() {
	const [userData, setUserData] = useState({});
	const [avatar, setAvatar] = useState(false);
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);
	const handleClose = () => {
		setShow(false);
		pageReload();
	};

	useEffect(() => {
		getUserHandler(setUserData);
		getAvatar(setAvatar);
	}, []);

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const updateImageHandler = async () => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		// const response = await fetch(
		// 	'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
		// 	{
		// 		method: 'POST',
		// 		body: formData,
		// 	}
		// )
		// 	const result = await response.json()
	};

	return (
		<div className="w3-col m3 sticky">
			<div className="w3-card w3-round w3-white">
				<div className="w3-container">
					<Link id="userProfile" to="/update-user">
						<h4 className="w3-center">
							<br />
							<i className="fa fa-edit"></i> Edit Profile
						</h4>
					</Link>
					<p className="w3-center">
						<label for="image">
							<img
								id="profileImg"
								src={avatar ? avatar : defaultImage}
								className="w3-circle"
								alt="Avatar"
							/>
						</label>
					</p>
					<Link to={''} onClick={handleShow}>
						<h4 className="w3-center">Update Image</h4>
						<hr />
					</Link>
					<p id="profileName">
						<i className="fa fa-user fa-fw w3-margin-right w3-text-theme"></i>
						{userData.name}
					</p>
					<p id="profileAddress">
						<i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i>
						{userData.address}
					</p>
					<p id="profileDob">
						<i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i>
						{userData.dob}
					</p>
					<br />
				</div>
			</div>
			<br />
			{/* <!-- Interests --> */}
			<div className="w3-card w3-round w3-white w3-hide-small">
				<div className="w3-container">
					<br />
					<p>Hobbies:</p>
					<p id="profileHobbies">
						<span className="w3-tag w3-small w3-theme-d5">{userData.hobbies}</span>
					</p>
					<br />
				</div>
			</div>
			<br />
			{/* <!-- End Left Column --> */}
			<ImageModals
				show={show}
				handleClose={handleClose}
				deleteImageHandler={() => {}}
				updateImageHandler={updateImageHandler}
				changeHandler={changeHandler}
				selectedFile={selectedFile}
				isFilePicked={isFilePicked}
			/>
		</div>
	);
}

export function UserInfoRightColumn() {
	const [userData, setUserData] = useState({});

	useEffect(() => {
		getUserHandler(setUserData);
	}, []);
	return (
		<div className="w3-col m2 w3-hide-small sticky">
			<div className="w3-card w3-round w3-white w3-center">
				<div className="w3-container">
					<br />
					<p>Events:</p>
					<p id="profileEvents">{userData.events}</p>
					<br />
				</div>
			</div>
			<br />
			{/* <!-- End Right Column --> */}
		</div>
	);
}
