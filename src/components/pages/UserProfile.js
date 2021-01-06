import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import UserComponent from '../UserComponent';
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
	},
	loading: {
		width: '100%',
	},
}));

export default function UserProfile({ match, location }) {
	const user = match.url.slice(10);
	const classes = useStyles();
	const { getUserProfile, thisUserData, allChallengesData, getAllChallengesData } = useAuth();

	useEffect(() => {
		if (allChallengesData.length === 0) {
			getAllChallengesData();
		}
		if (!thisUserData) {
			getUserProfile(user);
		} else if (thisUserData.userID !== user) {
			getUserProfile(user);
		}
	});

	if (!thisUserData || allChallengesData.length === 0 || thisUserData.userID !== user) {
		return (
			<Container component='main' maxWidth='lg'>
				<CssBaseline />
				<div className={classes.loading}>
					<Box m={10}>
						<LinearProgress />
					</Box>
				</div>
			</Container>
		);
	}

	return (
		<Container maxWidth='lg'>
			<CssBaseline />
			<div className={classes.paper}>
				<UserComponent currentUserData={thisUserData} allChallengesData={allChallengesData} />
			</div>
		</Container>
	);
}
