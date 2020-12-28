import './App.scss';
import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import AllChallenges from './components/pages/AllChallenges';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import Leaderboard from './components/pages/Leaderboard';
import EditProfile from './components/pages/EditProfile';
import ForgotPassword from './components/pages/ForgotPassword';
import Error from './components/pages/Error';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './contexts/PrivateRoute';
import LoggedInRoute from './contexts/LoggedInRoute';

// Challenges
import challenge1 from './components/pages/challenges/challenge1';

function App() {
	const location = useLocation();
	const [leaderboard, setLeaderboard] = useState(false);
	useEffect(() => {
		if (location.pathname === '/leaderboard') {
			setLeaderboard(true);
		} else {
			setLeaderboard(false);
		}
	}, [location.pathname]);

	return (
		<AuthProvider>
			<div className={leaderboard ? 'App-leaderboard' : 'App'}>
				<Header />
				<Switch>
					{/* Home */}
					<LoggedInRoute exact path='/' component={Home} />
					{/* User related pages */}
					<PrivateRoute exact path='/challenges' component={AllChallenges} />
					<PrivateRoute exact path='/profile' component={Profile} />
					<PrivateRoute exact path='/leaderboard' component={Leaderboard} />
					<PrivateRoute exact path='/profile/settings' component={EditProfile} />
					{/* Authentication */}
					<LoggedInRoute exact path='/login' component={Login} />
					<LoggedInRoute exact path='/register' component={Register} />
					<LoggedInRoute exact path='/reset-password' component={ForgotPassword} />
					{/* Challenges */}
					<PrivateRoute exact path='/challenges/challenge1' component={challenge1} />
					{/* Error - 404 page */}
					<Route component={Error} />
				</Switch>
				<Footer />
			</div>
		</AuthProvider>
	);
}

export default App;
