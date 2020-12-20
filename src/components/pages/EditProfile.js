import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import SettingsIcon from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useAuth } from '../../contexts/AuthContext';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function EditProfile() {
	const classes = useStyles();

	// const firstNameRef = useRef();
	// const lastNameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmationRef = useRef();

	const { currentUser, updateEmail, updatePassword } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
			return setError('Passwords do not match');
		}

		const promises = [];
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		setLoading(true);
		setError('');
		Promise.all(promises)
			.then(() => {
				setSuccess(true);
			})
			.catch((e) => {
				if (e instanceof TypeError) {
					setError('Failed to edit the account');
				} else if (e instanceof RangeError) {
					setError('Failed to edit the account');
				} else if (e instanceof EvalError) {
					setError('Failed to edit the account');
				} else {
					setSuccess(true);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<SettingsIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Edit Profile
				</Typography>
				<form onSubmit={handleSubmit} className={classes.form}>
					{error && (
						<Box mt={-1} mb={2}>
							<Alert variant='outlined' severity='error'>
								<AlertTitle>An error occured:</AlertTitle>
								{error}
							</Alert>
						</Box>
					)}
					{success && (
						<Box mt={-1} mb={2}>
							<Collapse in={success}>
								<Alert
									variant='outlined'
									severity='success'
									action={
										<IconButton
											aria-label='close'
											color='inherit'
											size='small'
											onClick={() => {
												setSuccess(false);
											}}
										>
											<CloseIcon fontSize='inherit' />
										</IconButton>
									}
								>
									<AlertTitle>Success!</AlertTitle>
									You have changed your profile.
								</Alert>
							</Collapse>
						</Box>
					)}
					<Grid container spacing={2}>
						{/* <Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='firstName'
								variant='outlined'
								fullWidth
								id='firstName'
								label='First Name'
								autoFocus
								inputRef={firstNameRef}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lname'
								inputRef={lastNameRef}
							/>
						</Grid> */}
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								inputRef={emailRef}
								defaultValue={currentUser.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								inputRef={passwordRef}
								helperText='*Leave blank to keep the same'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								fullWidth
								name='passwordConfirmation'
								label='Password Confirmation'
								type='password'
								id='passwordConfirmation'
								autoComplete='current-password'
								inputRef={passwordConfirmationRef}
								helperText='*Leave blank to keep the same'
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={loading}
					>
						Edit Profile
					</Button>
					<Grid container justify='center'>
						<Grid item>
							<Link to='/profil'>Cancel</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
