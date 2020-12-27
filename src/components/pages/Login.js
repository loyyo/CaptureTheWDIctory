import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();
	const history = useHistory();

	const emailRef = useRef();
	const passwordRef = useRef();
	const rememberRef = useRef();

	const { login, rememberedLogin } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		if (!rememberRef.current.checked) {
			try {
				setError('');
				setLoading(true);
				setSuccess(true);
				await login(emailRef.current.value, passwordRef.current.value);
				history.push('/profil');
			} catch {
				setError('Failed to sign in');
			}
			setLoading(false);
		} else if (rememberRef.current.checked) {
			try {
				setError('');
				setLoading(true);
				await rememberedLogin(emailRef.current.value, passwordRef.current.value);
				history.push('/profil');
			} catch {
				setError('Failed to sign in');
			}
			setLoading(false);
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					{error && (
						<Box mb={1}>
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
									You have changed been logged in. Redirecting...
								</Alert>
							</Collapse>
						</Box>
					)}
					<TextField
						className='textfield'
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						inputRef={emailRef}
					/>
					<TextField
						className='textfield'
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						inputRef={passwordRef}
					/>
					<Box mb={-2}>
						<FormControlLabel
							control={<Checkbox value='remember' inputRef={rememberRef} color='primary' />}
							label='Remember me'
						/>
					</Box>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={loading}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to='/reset-hasla'>Forgot password?</Link>
						</Grid>
						<Grid item>
							<Link to='/rejestracja'>{"Don't have an account? Sign Up"}</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
