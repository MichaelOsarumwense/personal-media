import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/home';
import RegisterPage from './pages/registerPage';
import ResetPasswordPage from './pages/resetPasswordPage';
import UpdateUserPage from './pages/updateUserPage';
import ProtectedRoute from './components/protectedRoute/protectedRoute';

function App() {
	return (
		<Switch>
			<ProtectedRoute path="/" component={HomePage} exact />
			<Route path="/login" component={LoginPage} />
			<Route path="/register" component={RegisterPage} />
			<Route path="/reset-password" component={ResetPasswordPage} />
			<ProtectedRoute path="/update-user" component={UpdateUserPage} />
		</Switch>
	);
}

export default App;
