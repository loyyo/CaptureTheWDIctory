import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Rating from 'react-rating';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
	button: {
		background: theme.palette.primary.dark,
	},
}));

export default function Challenges({ difficulty, allChallengesData, currentUserData }) {
	const classes = useStyles();
	const history = useHistory();

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

	return (
		<>
			<Grid container>
				{allChallengesData.map((e, index) => {
					if (difficulty === e.difficulty || difficulty === 'all') {
						return (
							<Grid item xs={12} sm={6} md={4} key={index}>
								<Box m={1}>
									<Paper elevation='3'>
										<Grid container direction='column'>
											<Grid item>
												{currentUserData.challenges[e.url] && (
													<>
														<Typography variant='h5' className='leaderboard-header'>
															{e.title}
															<div style={{ display: 'inline-block' }} title='Challenge passed'>
																<Checkbox
																	edge='end'
																	checked={true}
																	disabled
																	style={{ marginBottom: '-0.45rem', marginTop: '-0.55rem' }}
																	color='primary'
																/>
															</div>
														</Typography>
													</>
												)}
												{!currentUserData.challenges[e.url] && (
													<Typography variant='h5' className='leaderboard-header'>
														{e.title}
													</Typography>
												)}
											</Grid>
											<Grid container item>
												<Grid item xs={12} md={6}>
													<Typography variant='body1' className='leaderboard-light'>
														{e.points} Points
													</Typography>
												</Grid>
												<Grid item xs={12} md={6}>
													<Typography variant='body1' className='leaderboard-light-right'>
														Difficulty: {e.difficulty}
													</Typography>
												</Grid>
											</Grid>
											<Grid item xs={12}>
												<Box className='ratings'>
													<Rating
														emptySymbol='fa fa-star-o fa-2x'
														fullSymbol='fa fa-star fa-2x'
														fractions={100}
														initialRating={getInitialRating(e)}
														readonly
													/>
												</Box>
											</Grid>
											<Grid item xs={12}>
												<Button
													type='button'
													fullWidth
													variant='contained'
													color='primary'
													className={classes.button}
													onClick={() => {
														history.push(`/challenges/${e.url}`);
													}}
												>
													View
												</Button>
											</Grid>
										</Grid>
									</Paper>
								</Box>
							</Grid>
						);
					} else {
						return null;
					}
				})}
			</Grid>
		</>
	);
}
