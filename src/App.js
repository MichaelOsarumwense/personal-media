import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/home';
import RegisterPage from './pages/registerPage';
import ResetPasswordPage from './pages/resetPasswordPage';
import UpdateUserPage from './pages/updateUserPage';

function App() {
	return (
		<Switch>
			<Route path="/" exact>
				<LoginPage />
			</Route>
			<Route path="/home">
				<HomePage />
			</Route>
			<Route path="/register">
				<RegisterPage />
			</Route>
			<Route path="/reset-password">
				<ResetPasswordPage />
			</Route>
			<Route path="/update-user">
				<UpdateUserPage />
			</Route>
		</Switch>
	);
}

export default App;
