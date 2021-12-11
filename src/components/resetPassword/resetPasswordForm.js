import { useRef } from 'react';

function ResetPasswordForm(props) {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const secretRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const enteredUsername = usernameRef.current.value;
		const enteredPassword = passwordRef.current.value;
		const enteredSecret = secretRef.current.value;

		const userData = {
			email: enteredUsername,
			password: enteredPassword,
			secret: enteredSecret,
		};

		props.resetPassword(userData);
	}

	return (
		<form onSubmit={submitHandler}>
			<label className="label" htmlFor="username">
				username
			</label>
			<div className="field-group required">
				<span className="fa fa-envelope" aria-hidden="true" />
				<div className="wthree-field">
					<input
						name="email"
						id="email"
						type="email"
						placeholder="email"
						ref={usernameRef}
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
			<div className="wthree-field">
				<button id="submitButton" type="submit" className="btn">
					Reset
				</button>
			</div>
			<ul className="list-login-bottom">
				<li className="clearfix" />
			</ul>
		</form>
	);
}

export default ResetPasswordForm;
