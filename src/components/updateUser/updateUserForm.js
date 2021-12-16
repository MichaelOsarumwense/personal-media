import { useRef, useState, useEffect } from 'react';
import getUserHandler from '../../utils/handlers/getUserHandler';

function UpdateUserForm(props) {
	const [userData, setUserData] = useState({});

	useEffect(() => {
		getUserHandler(setUserData);
	}, []);

	const emailRef = useRef();
	const secretRef = useRef();
	const addressRef = useRef();
	const birthdayRef = useRef();
	const hobbiesRef = useRef();
	const eventsRef = useRef();
	const nameRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const enteredEmail = emailRef.current.value;
		const enteredSecret = secretRef.current.value;
		const enteredAddress = addressRef.current.value;
		const enteredBirthday = birthdayRef.current.value;
		const enteredHobby = hobbiesRef.current.value;
		const enteredEvent = eventsRef.current.value;
		const enteredName = nameRef.current.value;

		const userData = {
			email: enteredEmail,
			secret: enteredSecret,
			address: enteredAddress,
			dob: enteredBirthday,
			hobbies: enteredHobby,
			events: enteredEvent,
			name: enteredName,
		};

		props.UpdateUser(userData);
	}
	return (
		<form onSubmit={submitHandler}>
			<label className="label" htmlFor="names">
				Names
			</label>
			<div className="field-group">
				<span className="fa fa-user" aria-hidden="true"></span>
				<div className="wthree-field">
					<input
						defaultValue={userData.name}
						name="name"
						id="name"
						type="text"
						placeholder="Names"
						ref={nameRef}
					/>
				</div>
			</div>
			<label className="label" htmlFor="username">
				email
			</label>
			<div className="field-group required">
				<span className="fas fa-envelope" aria-hidden="true" />
				<div className="wthree-field">
					<input
						name="email"
						id="email"
						type="email"
						placeholder="email"
						ref={emailRef}
						defaultValue={userData.email}
						required
					/>
				</div>
			</div>
			<label className="label" htmlFor="secret">
				Secret
			</label>
			<div className="field-group required">
				<span className="fas fa-mask" aria-hidden="true" />
				<div className="wthree-field">
					<input
						name="mask"
						id="secret"
						type="text"
						placeholder="Security Word"
						ref={secretRef}
						defaultValue={userData.secret}
						required
					/>
				</div>
			</div>
			<label className="label" htmlFor="address">
				Address
			</label>
			<div className="field-group">
				<span className="fa fa-home" aria-hidden="true"></span>
				<div className="wthree-field">
					<input
						name="address"
						id="address"
						type="text"
						placeholder="London, UK"
						defaultValue={userData.address}
						ref={addressRef}
					/>
				</div>
			</div>
			<label className="label" htmlFor="Birthday">
				Birthday
			</label>
			<div className="field-group">
				<span className="fa fa-birthday-cake" aria-hidden="true"></span>
				<div className="wthree-field">
					<input
						name="dob"
						id="dob"
						type="text"
						placeholder="April 1, 1993"
						defaultValue={userData.dob}
						ref={birthdayRef}
					/>
				</div>
			</div>
			<label className="label" htmlFor="hobbies">
				Hobbies
			</label>
			<div className="field-group">
				<span className="fas fa-skiing" aria-hidden="true"></span>
				<div className="wthree-field">
					<input
						name="hobbies"
						id="hobbies"
						type="text"
						placeholder="Hobbies"
						defaultValue={userData.hobbies}
						ref={hobbiesRef}
					/>
				</div>
			</div>
			<label className="label" htmlFor="events">
				Events
			</label>
			<div className="field-group">
				<span className="fa fa-calendar-check" aria-hidden="true"></span>
				<div className="wthree-field">
					<input
						name="events"
						id="events"
						type="text"
						placeholder="Upcoming Event"
						defaultValue={userData.events}
						ref={eventsRef}
					/>
				</div>
			</div>
			<div className="wthree-field">
				<button id="submitButton" type="submit" className="btn">
					Update
				</button>
			</div>

			<ul className="list-login-bottom">
				<li className="clearfix" />
			</ul>
		</form>
	);
}

export default UpdateUserForm;
