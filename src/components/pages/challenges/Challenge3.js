import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useAuth } from '../../../contexts/AuthContext';
import LinearProgress from '@material-ui/core/LinearProgress';
import ChallengePage from '../../ChallengePage';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5),
	},
	loading: {
		width: '100%',
	},
}));

export default function Challenge3() {
	const classes = useStyles();
	const { getSingleChallengeData, singleChallengeData, getProfile, currentUserData } = useAuth();

	useEffect(() => {
		if (!currentUserData) {
			getProfile();
		}
		if (singleChallengeData.length === 0) {
			getSingleChallengeData('challenge3');
		} else if (singleChallengeData[0].url !== 'challenge3') {
			getSingleChallengeData('challenge3');
		}
	});

	if (
		singleChallengeData.length === 0 ||
		!currentUserData ||
		singleChallengeData[0].url !== 'challenge3'
	) {
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
	} else {
		return (
			<Container component='main' maxWidth='lg'>
				<CssBaseline />
				<div className={classes.paper}>
					<ChallengePage challenge={singleChallengeData} currentUser={currentUserData} />
				</div>
			</Container>
		);
	}
}
