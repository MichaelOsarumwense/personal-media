import { useRef } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

function LoginForm(props) {
	const usernameRef = useRef();
	const passwordRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const enteredUsername = usernameRef.current.value;
		const enteredPassword = passwordRef.current.value;

		const userData = {
			email: enteredUsername,
			password: enteredPassword,
		};

		props.loginUser(userData);
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
			<div className="wthree-field">
				<button id="submitButton" type="submit" className="btn">
					Login
				</button>
			</div>
			<ul className="list-login">
				<li>
					<BrowserRouter>
						<Link id="resetPassword" to="/reset-Password" className="text-right">
							<span className="fas fa-unlock-alt" aria-hidden="true"></span>
							<span className="fas fa-key" aria-hidden="true"></span> Reset Password?
						</Link>
					</BrowserRouter>
				</li>
				<li>
					<BrowserRouter>
						<Link id="signUp" to="/register" className="text-right">
							<i className="fas fa-user-plus"></i> Sign Up
						</Link>
					</BrowserRouter>
				</li>
				<li className="clearfix" />
			</ul>
			<ul className="list-login-bottom">
				<li className="clearfix" />
			</ul>
		</form>
	);
}

export default LoginForm;
