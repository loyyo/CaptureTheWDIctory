import './App.scss';
import React, { useState, useEffect, useMemo } from 'react';
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
import { useAuth } from './contexts/AuthContext';
import PrivateRoute from './contexts/PrivateRoute';
import LoggedInRoute from './contexts/LoggedInRoute';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Challenge from './components/pages/Challenge';
import UserProfile from './components/pages/UserProfile';
import GlobalChat from './components/pages/GlobalChat';

function App() {
	const { darkMode } = useAuth();

	const prefersDarkMode = useMediaQuery(
		darkMode === 'true' ? '(prefers-color-scheme: dark)' : '(prefers-color-scheme: light)'
	);

	const sm = useMediaQuery('(max-width:600px)');

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
					primary: {
						light: prefersDarkMode ? '#3f4fa3' : '#7986cb',
						main: prefersDarkMode ? '#2c387e' : '#3f51b5',
						dark: prefersDarkMode ? '#212c6f' : '#303f9f',
					},
				},
				overrides: {
					MuiCssBaseline: {
						'@global': {
							'.messages': {
								display: 'flex',
								alignItems: 'center',
								overflowWrap: 'break-word',
							},
							'.sent': {
								flexDirection: 'row-reverse',
							},
							'.sent .message': {
								color: 'white',
								background: '#0b93f6',
								alignSelf: 'flex-end',
							},
							'.received .message': {
								background: '#e5e5ea',
								color: 'black',
							},
							'.message': {
								maxWidth: '64vw',
								padding: '10px 20px',
								borderRadius: '2.5rem',
							},
							'.Mui-selected .MuiBottomNavigationAction-wrapper .MuiSvgIcon-root': {
								color: prefersDarkMode ? '#111111' : '#3f51b5',
							},
							'.Mui-selected .MuiBottomNavigationAction-wrapper .Mui-selected': {
								color: prefersDarkMode ? '#111111' : '#3f51b5',
							},
							'.headerDarkMode:after': {
								content: prefersDarkMode ? `'Light Mode'` : `'Dark Mode'`,
							},
							'.App-leaderboard': {
								overflowX: 'hidden',
							},
							'.leaderboard-header': {
								backgroundColor: prefersDarkMode ? '#2c387e' : '#3f51b5',
								color: 'white',
								padding: '1rem',
								textAlign: 'center',
							},
							'.leaderboard-header-dark': {
								backgroundColor: prefersDarkMode ? '#212c6f' : '#303f9f',
								color: 'white',
								padding: '1rem',
								textAlign: 'center',
							},
							'.leaderboard-light': {
								backgroundColor: prefersDarkMode ? '#3f4fa3' : '#7986cb',
								color: 'white',
								border: 'solid',
								borderLeft: 'none',
								borderRight: sm ? 'none' : '',
								borderBottom: sm ? 'none' : '',
								borderWidth: '0.01rem',
								height: '100%',
								borderColor: 'white',
								padding: '1rem',
								textAlign: 'center',
							},
							'.leaderboard-light-right': {
								backgroundColor: prefersDarkMode ? '#3f4fa3' : '#7986cb',
								color: 'white',
								border: 'solid',
								borderLeft: 'none',
								borderRight: 'none',
								borderWidth: '0.01rem',
								height: '100%',
								borderColor: 'white',
								padding: '1rem',
								textAlign: 'center',
							},
							'.ratings': {
								backgroundColor: prefersDarkMode ? '#3f4fa3' : '#7986cb',
								color: 'gold',
								border: 'solid',
								borderTop: 'none',
								borderLeft: 'none',
								borderRight: 'none',
								borderWidth: '0.01rem',
								height: '100%',
								borderColor: 'white',
								padding: '1rem',
								textAlign: 'center',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							},
							'.description': {
								backgroundColor: prefersDarkMode ? '#3f4fa3' : '#7986cb',
								color: 'white',
								border: 'none',
								borderLeft: 'none',
								borderWidth: '0.01rem',
								height: '100%',
								borderColor: 'white',
								padding: '1rem',
								textAlign: 'center',
							},
						},
					},
				},
			}),
		[prefersDarkMode, sm]
	);

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
		<div className={leaderboard ? 'App-leaderboard' : 'App'}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<Switch>
					{/* Home */}
					<LoggedInRoute exact path='/' component={Home} />
					{/* User related pages */}
					<PrivateRoute exact path='/challenges' component={AllChallenges} />
					<PrivateRoute exact path='/profile' component={Profile} />
					<PrivateRoute exact path='/leaderboard' component={Leaderboard} />
					<PrivateRoute exact path='/profile/settings' component={EditProfile} />
					<PrivateRoute exact path='/chat' component={GlobalChat} />
					{/* Authentication */}
					<LoggedInRoute exact path='/login' component={Login} />
					<LoggedInRoute exact path='/register' component={Register} />
					<LoggedInRoute exact path='/reset-password' component={ForgotPassword} />
					{/* Challenges */}
					<PrivateRoute exact path='/challenges/:challengeID' component={Challenge} />
					{/* Users */}
					<PrivateRoute exact path='/profiles/:userID' component={UserProfile} />
					{/* Error - 404 page */}
					<Route component={Error} />
				</Switch>
				<Footer />
			</ThemeProvider>
		</div>
	);
}

export default App;
