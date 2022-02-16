import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/loginPage';

test('renders learn react link', () => {
	render(<LoginPage />);
	const linkElement = screen.getByPlaceholderText(/email/i);
	expect(linkElement).toBeVisible();
});
