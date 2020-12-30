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
import Challenge1 from './components/pages/challenges/Challenge1';
import Challenge2 from './components/pages/challenges/Challenge2';
import Challenge3 from './components/pages/challenges/Challenge3';
import Challenge4 from './components/pages/challenges/Challenge4';
import Challenge5 from './components/pages/challenges/Challenge5';
import Challenge6 from './components/pages/challenges/Challenge6';

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
					<PrivateRoute exact path='/challenges/challenge1' component={Challenge1} />
					<PrivateRoute exact path='/challenges/challenge2' component={Challenge2} />
					<PrivateRoute exact path='/challenges/challenge3' component={Challenge3} />
					<PrivateRoute exact path='/challenges/challenge4' component={Challenge4} />
					<PrivateRoute exact path='/challenges/challenge5' component={Challenge5} />
					<PrivateRoute exact path='/challenges/challenge6' component={Challenge6} />
					{/* Error - 404 page */}
					<Route component={Error} />
				</Switch>
				<Footer />
			</div>
		</AuthProvider>
	);
}

export default App;
