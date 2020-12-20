import './App.scss';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AllChallenges from './components/pages/AllChallenges';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import Leaderboard from './components/pages/Leaderboard';
import EditProfile from './components/pages/EditProfile';
import Challenge from './components/pages/Challenge';
import ForgotPassword from './components/pages/ForgotPassword';
import Error from './components/pages/Error';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './contexts/PrivateRoute';
import LoggedInRoute from './contexts/LoggedInRoute';

function App() {
	return (
		<AuthProvider>
			<div className='App'>
				<Header />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/wyzwania' component={AllChallenges} />
					<PrivateRoute exact path='/profil' component={Profile} />
					<LoggedInRoute exact path='/login' component={Login} />
					<LoggedInRoute exact path='/rejestracja' component={Register} />
					<Route exact path='/tabela' component={Leaderboard} />
					<PrivateRoute exact path='/profil/edytuj' component={EditProfile} />
					<Route exact path='/wyzwanie' component={Challenge} />
					<LoggedInRoute exact path='/reset-hasla' component={ForgotPassword} />
					<Route component={Error} />
				</Switch>
				<Footer />
			</div>
		</AuthProvider>
	);
}

export default App;
