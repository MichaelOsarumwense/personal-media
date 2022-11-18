import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import HomePage from '../pages/homePage';

const homeScreen = (
	<BrowserRouter>
		<HomePage />
	</BrowserRouter>
);

test('renders home page', async () => {
	await act(async () => {
		render(homeScreen);
		screen.debug('');
	});

	const signUpLink = await screen.findByRole('button', { name: /Post/i });
	expect(signUpLink).toBeVisible();
	expect(signUpLink).toBeEnabled();
});
