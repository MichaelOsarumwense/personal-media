import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import LoginPage from '../pages/loginPage';

const loginScreen = (
	<BrowserRouter>
		<LoginPage />
	</BrowserRouter>
);

test('renders email text box', () => {
	render(loginScreen);
	// screen.debug('');
	// Screen Items
	const email = screen.getByPlaceholderText(/email/i);

	userEvent.type(email, 'michael@gmail.com');

	expect(email).toHaveValue('michael@gmail.com');
	expect(email).toBeEnabled();
	// screen.getByRole('');
});

test('render password textbox', () => {
	render(loginScreen);
	// screen.debug('');
	// Screen Items
	const password = screen.getByPlaceholderText(/password/i);

	expect(password).toBeVisible();
	expect(password).toBeEnabled();
});

test('renders login button', () => {
	render(loginScreen);
	// screen.debug('');
	// Screen Items
	const loginButton = screen.getByRole('button', { name: /login/i });

	expect(loginButton).toBeVisible();
	expect(loginButton).toBeEnabled();
});

test('renders logo', () => {
	render(loginScreen);

	// Screen Items
	const logo = screen.getByRole('link', { name: /private media/i });

	expect(logo).toBeVisible();
	expect(logo).toBeEnabled();
});

test('renders register link', () => {
	render(loginScreen);

	// Screen Items
	const registerLink = screen.getByRole('link', { name: /register/i });

	expect(registerLink).toBeVisible();
	expect(registerLink).toBeEnabled();
});

test('renders reset password link', () => {
	render(loginScreen);

	// Screen Items
	const resetPasswordLink = screen.getByRole('link', { name: /reset password\?/i });

	expect(resetPasswordLink).toBeVisible();
	expect(resetPasswordLink).toBeEnabled();
});

test('renders sign up link', () => {
	render(loginScreen);
	// screen.debug('');

	// Screen Items
	const signUpLink = screen.getByRole('link', { name: /sign up/i });

	expect(signUpLink).toBeVisible();
	expect(signUpLink).toBeEnabled();
});

test('renders intro write up text', () => {
	render(loginScreen);
	// screen.debug('');

	// Screen Items
	const introWriteUp = screen.getByText(
		/private media lets you share your thoughts and experiences without having to worry about anyone snooping in your business\./i
	);

	expect(introWriteUp).toBeVisible();
});
