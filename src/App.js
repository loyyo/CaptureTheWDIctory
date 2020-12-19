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
import Error from './components/pages/Error';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/wyzwania' component={AllChallenges} />
				<Route exact path='/profil' component={Profile} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/rejestracja' component={Register} />
				<Route exact path='/tabela' component={Leaderboard} />
				<Route exact path='/profil/edytuj' component={EditProfile} />
				<Route exact path='/wyzwanie' component={Challenge} />
				<Route component={Error} />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
