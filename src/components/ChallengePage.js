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
	const { doChallenge } = useAuth();

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
					history.push('/challenges');
					history.go(0);
				}, 1000);
			} catch {
				setError(true);
				setSuccess(false);
			}
			setLoading(false);
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
				<Typography variant='h4' className='leaderboard-header-dark'>
					{challenge[0].title}
				</Typography>
				<Divider />
			</Grid>
			<Grid container item xs={12}>
				<Grid item xs={12} sm={6}>
					<Typography variant='h6' className='leaderboard-light'>
						{challenge[0].points} Points
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant='h6' className='leaderboard-light-right'>
						Difficulty: {challenge[0].difficulty}
					</Typography>
				</Grid>
			</Grid>

			<Box className={classes.info}>
				<Grid item container xs={12}>
					<Grid item xs={12}>
						<div className={classes.info}>
							<Box>
								<Paper className={classes.info}>
									<Typography className='leaderboard-header' variant='body1'>
										{challenge[0].description}
									</Typography>
								</Paper>
							</Box>
						</div>
					</Grid>
					<Grid item xs={12}>
						{currentUser.challenges[challenge[0].url] && (
							<Typography variant='h5' className='leaderboard-header-dark'>
								You've already done this challenge!
							</Typography>
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
												helperText={success ? 'You will be redirected in a few seconds...' : ''}
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
										disabled={loading}
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
