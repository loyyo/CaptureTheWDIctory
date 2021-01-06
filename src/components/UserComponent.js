import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	list: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		// display: 'flex',
		flexDirection: 'row',
		// padding: 0,
	},
	button: {
		margin: theme.spacing(0.5, 0, 0.5),
	},
	avatar: {
		width: '200px',
		height: '200px',
		margin: 'auto',
	},
	avatarbox: {},
	listitem: {
		cursor: 'default',
	},
	checkbox: {
		cursor: 'default',
	},
}));

export default function UserProfile({ currentUserData, allChallengesData }) {
	const classes = useStyles();
	const history = useHistory();

	const theme = useTheme();
	const lg = useMediaQuery(theme.breakpoints.up('md'));
	const md = useMediaQuery(theme.breakpoints.down('md'));
	const xs = useMediaQuery(theme.breakpoints.down('xs'));

	const screenSize = () => {
		if (lg) {
			return 3;
		}
		if (md) {
			if (xs) {
				return 1;
			}
			return 3;
		}
	};

	return (
		<>
			<Paper variant='' elevation='6'>
				<Grid container>
					<Grid item xs={12}>
						<Typography variant='h4' className='leaderboard-header'>
							{currentUserData.username}
						</Typography>
					</Grid>
					<Grid item xs={12} lg={3}>
						<Box m={2} mb={2}>
							<Paper variant='outlined' elevation='3'>
								<Box m={2} mb={1} ml={3} pr={2} mr={1}>
									<Paper variant='outlined' elevation='3'>
										<Avatar
											variant='rounded'
											alt='default_avatar'
											src={currentUserData.avatar}
											className={classes.avatar}
											style={{ padding: '0.5rem' }}
										/>
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
							</Paper>
						</Box>
					</Grid>
					<Grid item xs={12} lg={9}>
						<Box m={2} mb={2} ml={3}>
							<Paper variant='outlined' elevation='3'>
								<Box mb={1} mt={1}>
									<Typography align='center' display='block' variant='h5'>
										Points: {currentUserData.points}
									</Typography>
								</Box>
								<Divider variant='middle' />
								<Box mt={1}>
									<Typography align='center' display='block' variant='h5'>
										Completed Challenges:
									</Typography>
									<Box mt={1}>
										<Divider />
										<Divider />
										<GridList
											cellHeight='auto'
											spacing={0}
											cols={screenSize()}
											className={classes.list}
										>
											{allChallengesData.map((e, key) => {
												return (
													<ListItem
														className={classes.listitem}
														divider
														button
														onClick={() => {
															history.push(`/challenges/${e.url}`);
														}}
														key={key}
													>
														<Divider orientation='vertical' />
														<ListItemIcon>
															<Checkbox
																className={classes.checkbox}
																edge='end'
																checked={currentUserData.challenges[e.url]}
																disableRipple
																disabled
																color='primary'
															/>
														</ListItemIcon>
														<ListItemText id='challenge1' primary={e.title} />
														<Divider orientation='vertical' />
													</ListItem>
												);
											})}
										</GridList>
									</Box>
								</Box>
							</Paper>
						</Box>
					</Grid>
				</Grid>
			</Paper>
		</>
	);
}
