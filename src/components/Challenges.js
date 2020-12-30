import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	button: {
		background: theme.palette.primary.dark,
	},
}));

export default function Challenges({ difficulty, allChallengesData }) {
	const classes = useStyles();
	const history = useHistory();

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
												<Typography variant='h5' className='leaderboard-header'>
													{e.title}
												</Typography>
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
