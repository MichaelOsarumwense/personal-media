import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import HomePage from '../pages/homePage';

const homeScreen = (
	<BrowserRouter>
		<HomePage />
	</BrowserRouter>
);

test('renders home page', async () => {
	render(homeScreen);
	screen.debug('');
	// Screen Items
	const signUpLink = await screen.findByRole('button', { name: /ghosts/i });

	expect(signUpLink).toBeVisible();
	expect(signUpLink).toBeEnabled();
});
