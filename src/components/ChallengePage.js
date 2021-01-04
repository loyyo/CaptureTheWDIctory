import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useAuth } from '../contexts/AuthContext';
import Rating from 'react-rating';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
	info: {
		background: theme.palette.primary.main,
	},
	button: {
		background: theme.palette.primary.light,
	},
	input: {
		'&::placeholder': {
			color: 'white',
			textAlign: 'center',
		},
		color: 'white',
		background: theme.palette.primary.light,
	},
}));

const theme = createMuiTheme({
	palette: {
		error: green,
	},
});

export default function ChallengePage({ challenge, currentUser }) {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const keyRef = useRef();
	const classes = useStyles();
	const history = useHistory();
	const { darkMode, doChallenge, rateChallenge } = useAuth();

	async function checkKey() {
		if (keyRef.current.value !== challenge[0].key) {
			setError(true);
		} else {
			try {
				setError(false);
				setLoading(true);
				await doChallenge(
					challenge[0].url,
					challenge[0].points,
					currentUser.email,
					currentUser.points
				);
				setSuccess(true);
				setTimeout(() => {
					// history.push('/challenges');
					history.go(0);
				}, 3000);
			} catch {
				setError(true);
				setSuccess(false);
			}
			setLoading(false);
		}
	}

	const getInitialRating = (challenge) => {
		var e = challenge.ratings;
		var v = 0;
		var i = 0;
		for (var k in e) {
			if (e.hasOwnProperty(k)) {
				v = v + e[k];
				i = i + 1;
			}
		}
		return v / i;
	};

	async function handleRating(value) {
		try {
			await rateChallenge(value, challenge[0].url, currentUser.email);
			history.push('/challenges');
			history.go(0);
		} catch {
			console.error('Something bad happened :(');
		}
	}

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError(!error);
			}, 5000);
		}
	}, [error]);

	return (
		<Grid container direction='column'>
			<Grid item xs={12}>
				<Typography
					variant='h4'
					className={
						darkMode === 'true'
							? 'leaderboard-header-dark dark-color-darkMode'
							: 'leaderboard-header-dark'
					}
				>
					{challenge[0].title}
				</Typography>
				<Divider />
			</Grid>
			<Grid container item xs={12}>
				<Grid item xs={12} sm={6}>
					<Typography
						variant='h6'
						className={
							darkMode === 'true' ? 'leaderboard-light light-color-darkMode' : 'leaderboard-light'
						}
					>
						{challenge[0].points} Points
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography
						variant='h6'
						className={
							darkMode === 'true'
								? 'leaderboard-light-right light-color-darkMode'
								: 'leaderboard-light-right'
						}
					>
						Difficulty: {challenge[0].difficulty}
					</Typography>
				</Grid>
			</Grid>

			{!currentUser.challenges[challenge[0].url] && (
				<Grid item xs={12}>
					<Box className={darkMode === 'true' ? 'ratings light-color-darkMode' : 'ratings'}>
						<Typography variant='h6' style={{ color: 'white' }}>
							Community Ranking:
						</Typography>
						<Box ml={2} />
						<Rating
							emptySymbol='fa fa-star-o fa-2x'
							fullSymbol='fa fa-star fa-2x'
							fractions={100}
							initialRating={getInitialRating(challenge[0])}
							readonly
						/>
					</Box>
				</Grid>
			)}

			{currentUser.challenges[challenge[0].url] && (
				<Grid item xs={12}>
					<Box className={darkMode === 'true' ? 'ratings light-color-darkMode' : 'ratings'}>
						<Typography variant='h6' style={{ color: 'white' }}>
							Rate This Challenge:
						</Typography>
						<Box ml={2} />
						<Rating
							emptySymbol='fa fa-star-o fa-2x'
							fullSymbol='fa fa-star fa-2x'
							fractions={2}
							initialRating={
								challenge[0].ratings[currentUser.email]
									? challenge[0].ratings[currentUser.email]
									: 5
							}
							onClick={handleRating}
						/>
					</Box>
				</Grid>
			)}

			<Box className={classes.info}>
				<Grid item container xs={12}>
					<Grid item xs={12}>
						<div className={classes.info}>
							<Box>
								<Paper className={classes.info}>
									<Typography
										className={
											darkMode === 'true'
												? 'leaderboard-header main-color-darkMode'
												: 'leaderboard-header'
										}
										variant='body1'
									>
										{challenge[0].description}
									</Typography>
								</Paper>
							</Box>
						</div>
					</Grid>
					<Grid item xs={12}>
						{currentUser.challenges[challenge[0].url] && (
							<>
								{challenge[0].ratings[currentUser.email] && (
									<Typography
										variant='h5'
										className={
											darkMode === 'true'
												? 'leaderboard-header-dark dark-color-darkMode'
												: 'leaderboard-header-dark'
										}
									>
										You've already done & rated this challenge! You can change your vote anytime
										(◕‿◕✿)
									</Typography>
								)}
								{!challenge[0].ratings[currentUser.email] && (
									<Typography
										variant='h5'
										className={
											darkMode === 'true'
												? 'leaderboard-header-dark dark-color-darkMode'
												: 'leaderboard-header-dark'
										}
									>
										GG WP! You've successfully completed this challenge. You can now rate it :-) ☝
									</Typography>
								)}
							</>
						)}
					</Grid>
					{!currentUser.challenges[challenge[0].url] && (
						<>
							<Grid item xs={12} sm={6}>
								<Box p={2}>
									{!success && (
										<TextField
											error={error}
											helperText={
												error ? 'Unfortunately, that is not the correct flag. Try again!' : ''
											}
											inputRef={keyRef}
											placeholder='Enter the flag here'
											variant='outlined'
											fullWidth
											InputProps={{ classes: { input: classes.input } }}
										/>
									)}
									{success && (
										<ThemeProvider theme={theme}>
											<TextField
												error={success}
												helperText={success ? 'Your page will refresh in a few seconds...' : ''}
												value='Congratulations! You have captured the flag!'
												variant='outlined'
												fullWidth
												InputProps={{ classes: { input: classes.input } }}
											/>
										</ThemeProvider>
									)}
								</Box>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Box p={1} m={2}>
									<Button
										type='button'
										fullWidth
										variant='contained'
										color='primary'
										size='large'
										disabled={loading ? loading : success}
										className={classes.button}
										onClick={checkKey}
									>
										Submit Flag
									</Button>
								</Box>
							</Grid>
						</>
					)}
				</Grid>
			</Box>
		</Grid>
	);
}
