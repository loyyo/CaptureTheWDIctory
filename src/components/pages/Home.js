import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	button: {
		margin: theme.spacing(2.5, 0, 2.5),
	},
}));

export default function Home() {
	const classes = useStyles();

	return (
		<Container maxWidth='lg'>
			<CssBaseline />
			<Grid container spacing={5}>
				<Grid item sm={9} md={5}>
					<div className={classes.paper}>
						<Paper variant='outlined' elevation='3'>
							<Box mb={5} mt={5} mr={8} ml={8}>
								<Typography variant='h4' gutterBottom>
									Join 60,000+ hackers
								</Typography>
								<Typography variant='h6' paragraph>
									CTFlearn is an ethical hacking platform that enables tens of thousands to learn,
									practice, and compete.
								</Typography>
								<Typography variant='h6' paragraph>
									We host an ever-changing array of user-submitted and community-verified challenges
									in a wide range of topics.
								</Typography>
							</Box>
							<Divider variant='middle' />
							<Box mt={1}>
								<Grid justify='center' container spacing={5}>
									<Grid item>
										<Link to='/register'>
											<Button
												type='button'
												fullWidth
												variant='contained'
												color='primary'
												size='large'
												className={classes.button}
											>
												SING UP
											</Button>
										</Link>
									</Grid>
									<Grid item>
										<Link to='/login'>
											<Button
												type='button'
												fullWidth
												variant='outlined'
												color='primary'
												size='large'
												className={classes.button}
											>
												Sign In
											</Button>
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</div>
				</Grid>
				<Grid item sm={9} md={7}>
					<div className={classes.paper}>
						<Paper variant='outlined' elevation='3'>
							<Box mt={5} mr={5} ml={5}>
								<Typography variant='h4' gutterBottom>
									What's new
								</Typography>
								<Typography variant='caption'>RE-PROGRAMMED FROM THE GROUND UP</Typography>
								<Typography variant='h6' paragraph>
									Allows us to create new features, much faster
								</Typography>
								<Typography variant='caption'>CHALLENGE RATINGS</Typography>
								<Typography variant='h6' paragraph>
									After solving a challenge, rate it, and contribute to the community rating.
								</Typography>
								<Typography variant='caption'>EVENTS</Typography>
								<Typography variant='h6' paragraph>
									CTFlearn will now be hosting events!
								</Typography>
								<Typography variant='caption'>MUCH MORE</Typography>
								<Typography variant='h6' paragraph>
									Check out the rest of the site to see changes to challenges, creating challenges,
									activity, and more!
								</Typography>
							</Box>
						</Paper>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
}
