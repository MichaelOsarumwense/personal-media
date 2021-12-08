import { useRef } from 'react';

function UpdateUserForm(props) {
	const emailRef = useRef();
	const passwordRef = useRef();
	const secretRef = useRef();
	const addressRef = useRef();
	const birthdayRef = useRef();
	const hobbiesRef = useRef();
	const eventsRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const enteredEmail = emailRef.current.value;
		const enteredPassword = passwordRef.current.value;
		const enteredSecret = secretRef.current.value;
		const enteredAddress = addressRef.current.value;
		const enteredBirthday = birthdayRef.current.value;
		const enteredHobby = hobbiesRef.current.value;
		const enteredEvent = eventsRef.current.value;

		const userData = {
			email: enteredEmail,
			password: enteredPassword,
			secret: enteredSecret,
			address: enteredAddress,
			dob: enteredBirthday,
			hobbies: enteredHobby,
			events: enteredEvent,
		};

		props.UpdateUser(userData);
	}
	return (
		<form onSubmit={submitHandler}>
			<label className="label" htmlFor="username">
				email
			</label>
			<div className="field-group required">
				<span className="fa fa-email" aria-hidden="true" />
				<div className="wthree-field">
					<input
						name="email"
						id="email"
						type="email"
						placeholder="email"
						ref={emailRef}
						required
					/>
				</div>
			</div>
			<label className="label" htmlFor="password">
				password
			</label>
			<div className="field-group required">
				<span className="fa fa-lock" aria-hidden="true" />
				<div className="wthree-field">
					<input
						name="password"
						id="password"
						type="Password"
						placeholder="password"
						ref={passwordRef}
						required
					/>
				</div>
			</div>
			<label className="label" htmlFor="secret">
				Secret
			</label>
			<div className="field-group required">
				<span className="fa fa-envelope" aria-hidden="true" />
				<div className="wthree-field">
					<input
						name="mask"
						id="secret"
						type="text"
						placeholder="Security Word"
						ref={secretRef}
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
						ref={addressRef}
					/>
				</div>
			</div>
			<label className="label" htmlFor="Birthday">
				Birthday
			</label>
			<div className="field-group">
				<span className="fa fa-cake" aria-hidden="true"></span>
				<div className="wthree-field">
					<input
						name="dob"
						id="dob"
						type="text"
						placeholder="April 1, 1993"
						ref={birthdayRef}
					/>
				</div>
			</div>
			<label className="label" htmlFor="hobbies">
				Hobbies
			</label>
			<div className="field-group">
				<span className="fa fa-skiing" aria-hidden="true"></span>
				<div className="wthree-field">
					<input
						name="hobbies"
						id="hobbies"
						type="text"
						placeholder="Hobbies"
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
