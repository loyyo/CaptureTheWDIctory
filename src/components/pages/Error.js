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
		marginTop: theme.spacing(15),
		marginBottom: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	button: {
		margin: theme.spacing(2.5, 0, 2.5),
	},
}));

const debug = () => {
	console.log('A jednak coś tu było: WDIctory_404_founded!');
};

export default function Error() {
	const classes = useStyles();

	return (
		<Container maxWidth='md'>
			<CssBaseline />
			<div className={classes.paper}>
				<Grid container>
					<Grid item xs={1} />
					<Grid item xs={10}>
						<Paper variant='outlined' elevation='3'>
							<Box mb={3} mt={3} mr={5} ml={5}>
								<Typography variant='h5' gutterBottom>
									Ups, sorki memorki, ale tu prawdopodobnie nie znajdziesz żadnego klucza CTF...
									Prawdopodobnie... :-)
								</Typography>
							</Box>
							<Divider variant='middle' />
							<Grid justify='center' container spacing={2} row>
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
							<Grid item xs={1} />
						</Paper>
					</Grid>
				</Grid>
			</div>
			<Button size='small' onClick={debug}>
				ok
			</Button>
		</Container>
	);
}
