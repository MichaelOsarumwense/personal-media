import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getUserHandler from '../../utils/getUserHandler';
import avatar from '../layout/images/01.png';

export function UserInfoLeftColumn() {
	const [userData, setUserData] = useState({});

	useEffect(() => {
		getUserHandler(setUserData);
	}, []);

	return (
		<div className="w3-col m3 sticky">
			<div className="w3-card w3-round w3-white">
				<div className="w3-container">
					<Link id="userProfile" to="/update-user">
						<h4 className="w3-center">
							<i className="fa fa-edit"></i> Edit Profile
						</h4>
					</Link>
					<p className="w3-center">
						<img id="profileImg" src={avatar} className="w3-circle" alt="Avatar" />
					</p>
					<hr />
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
				</div>
			</div>
			<br />
			{/* <!-- Interests --> */}
			<div className="w3-card w3-round w3-white w3-hide-small">
				<div className="w3-container">
					<p>Hobbies:</p>
					<p id="profileHobbies">
						<span className="w3-tag w3-small w3-theme-d5">{userData.hobbies}</span>
					</p>
				</div>
			</div>
			<br />
			{/* <!-- End Left Column --> */}
		</div>
	);
}

export function UserInfoRightColumn() {
	const [userData, setUserData] = useState({});

	useEffect(() => {
		getUserHandler(setUserData);
	}, []);
	return (
		<div className="w3-col m2 sticky">
			<div className="w3-card w3-round w3-white w3-center">
				<div className="w3-container">
					<p>Events:</p>
					<p id="profileEvents">{userData.events}</p>
				</div>
			</div>
			<br />
			{/* <!-- End Right Column --> */}
		</div>
	);
}
