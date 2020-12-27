import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
	list: {
		width: '100%',
		maxWidth: '70vw',
		backgroundColor: theme.palette.background.paper,
	},
	paper: {
		marginTop: theme.spacing(15),
		marginBottom: theme.spacing(5),

		// display: 'flex',
		// flexDirection: 'column',
		// alignItems: 'center',
	},
	button: {
		margin: theme.spacing(0.5, 0, 0.5),
	},
	avatar: {
		width: theme.spacing(25),
		height: theme.spacing(25),
	},
	loading: {
		width: '100%',
	},
	listitem: {
		cursor: 'default',
	},
	checkbox: {
		cursor: 'default',
	},
}));

export default function Error() {
	const classes = useStyles();
	const { getProfile, currentUserData } = useAuth();

	useEffect(() => {
		if (!currentUserData) {
			getProfile();
		}
	});

	if (!currentUserData) {
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
				<Paper variant='outlined' elevation='3'>
					<Grid container>
						<Grid item lg={3}>
							<Box m={2} mb={2} mr={3}>
								<Paper variant='outlined' elevation='3'>
									<Box m={2} mb={1} ml={3} pr={2} mr={1}>
										<Paper variant='outlined' elevation='3'>
											<Box m={1}>
												<Avatar
													variant='rounded'
													alt='default_avatar'
													src={currentUserData.avatar}
													sizes='150px 150px'
													className={classes.avatar}
													style={{ padding: '0.5rem' }}
												/>
											</Box>
											<Divider variant='middle' />
											<Box pb={1} pt={1}>
												<Typography align='center' display='block' variant='overline'>
													<strong>{currentUserData.username}</strong>
												</Typography>
											</Box>
										</Paper>
									</Box>
									<Box p={1} ml={1} pl={2} pr={4} mb={1} mr={-1}>
										<Paper variant='outlined' elevation='3'>
											<Box m={2} mb={2}>
												<Typography display='block' variant='h6'>
													Bio
												</Typography>
												<Typography
													display='block'
													variant='body2'
													style={{ wordWrap: 'break-word' }}
												>
													{currentUserData.bio}
												</Typography>
											</Box>
										</Paper>
									</Box>
									<Box m={1} mr={3} ml={3} mt={-1}>
										<Link style={{ textDecoration: 'none' }} to='/profil/edytuj'>
											<Button
												type='button'
												fullWidth
												variant='contained'
												color='primary'
												className={classes.button}
											>
												Edit Profile
											</Button>
										</Link>
									</Box>
								</Paper>
							</Box>
						</Grid>
						<Grid item lg={9}>
							<Box m={2} mb={2} ml={3}>
								<Paper variant='outlined' elevation='3'>
									<Box mb={1} mt={1}>
										<Typography align='center' display='block' variant='h5'>
											Rank: {currentUserData.rank}
										</Typography>
										<Typography align='center' display='block' variant='h5'>
											Points: {currentUserData.points}
										</Typography>
									</Box>
									<Divider variant='middle' />
									<Box mb={1} mt={1}>
										<Typography align='center' display='block' variant='h5'>
											Completed Challenges:
										</Typography>
										<Grid container>
											<Box ml={3}>
												<List className={classes.list}>
													<ListItem className={classes.listitem} divider button>
														<ListItemIcon>
															<Checkbox
																className={classes.checkbox}
																edge='start'
																checked={currentUserData.challenges.challenge1}
																disableRipple
																disabled
																color='primary'
															/>
														</ListItemIcon>
														<ListItemText id='challenge1' primary={`Challenge nr 1`} />
													</ListItem>
													<ListItem className={classes.listitem} divider button>
														<ListItemIcon>
															<Checkbox
																className={classes.checkbox}
																edge='start'
																checked={currentUserData.challenges.challenge2}
																disableRipple
																color='primary'
																disabled
															/>
														</ListItemIcon>
														<ListItemText id='challenge2' primary={`Challenge nr 2`} />
													</ListItem>
													<ListItem className={classes.listitem} divider button>
														<ListItemIcon>
															<Checkbox
																className={classes.checkbox}
																edge='start'
																checked={currentUserData.challenges.challenge3}
																disableRipple
																color='primary'
																disabled
															/>
														</ListItemIcon>
														<ListItemText id='challenge3' primary={`Challenge nr 3`} />
													</ListItem>
													<ListItem className={classes.listitem} divider button>
														<ListItemIcon>
															<Checkbox
																className={classes.checkbox}
																edge='start'
																checked={currentUserData.challenges.challenge4}
																disableRipple
																color='primary'
																disabled
															/>
														</ListItemIcon>
														<ListItemText id='challenge4' primary={`Challenge nr 4`} />
													</ListItem>
													<ListItem className={classes.listitem} button>
														<ListItemIcon>
															<Checkbox
																className={classes.checkbox}
																edge='start'
																checked={currentUserData.challenges.challenge5}
																disableRipple
																color='primary'
																disabled
															/>
														</ListItemIcon>
														<ListItemText id='challenge5' primary={`Challenge nr 5`} />
													</ListItem>
												</List>
											</Box>
										</Grid>
									</Box>
								</Paper>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</div>
		</Container>
	);
}
