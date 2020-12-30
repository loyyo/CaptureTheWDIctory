import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FlagIcon from '@material-ui/icons/Flag';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	colorInherit: {
		color: '#000000',
		backgroundColor: '#000000',
	},
	menuButton: {
		marginRight: theme.spacing(-1),
	},
	title: {
		flexGrow: 1,
	},
	icon: {
		color: 'white',
	},
}));

const Header = () => {
	const classes = useStyles();
	const history = useHistory();

	const [anchorEl, setAnchorEl] = useState(null);
	const [error, setError] = useState('error');
	const open = Boolean(anchorEl);

	const { darkMode, switchDarkMode, currentUser, logout } = useAuth();

	async function handleLogout() {
		setError('');
		try {
			await logout();
			history.go(0);
		} catch {
			setError('Failed to log out');
			console.error(error);
		}
	}

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDarkMode = () => {
		switchDarkMode();
	};

	return (
		<div>
			<div className={classes.root}>
				<AppBar color='primary' position='static'>
					<Toolbar>
						<Typography variant='h5' className={classes.title}>
							<Button>
								<Link className='href' to='/'>
									Capture The WDIctory
								</Link>
							</Button>
						</Typography>

						{currentUser !== null && (
							<>
								<Button className={classes.menuButton}>
									<Link className='href' to='/challenges'>
										<FlagIcon className={classes.icon} />
									</Link>
								</Button>
								<Button>
									<Link className='href' to='/leaderboard'>
										<EqualizerIcon className={classes.icon} />
									</Link>
								</Button>
							</>
						)}

						<div className=''>
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenu}
								color='inherit'
							>
								<AccountCircle className={classes.icon} />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={handleClose}
							>
								{currentUser === null && (
									<>
										<MenuItem onClick={handleClose}>
											<Link className={darkMode === 'true' ? 'href' : 'href-black'} to='/login'>
												Login
											</Link>
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<Link className={darkMode === 'true' ? 'href' : 'href-black'} to='/register'>
												Sign Up
											</Link>
										</MenuItem>
										<MenuItem onClick={handleDarkMode}>Dark Mode</MenuItem>
									</>
								)}
								{currentUser !== null && (
									<>
										<MenuItem onClick={handleClose}>
											<Link className={darkMode === 'true' ? 'href' : 'href-black'} to='/profile'>
												Profile
											</Link>
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<Link
												className={darkMode === 'true' ? 'href' : 'href-black'}
												to='/profile/settings'
											>
												Settings
											</Link>
										</MenuItem>
										<MenuItem onClick={handleDarkMode}>Dark Mode</MenuItem>
										<Link
											onClick={handleLogout}
											className={darkMode === 'true' ? 'href' : 'href-black'}
											to='/'
										>
											<MenuItem onClick={handleClose}>Logout</MenuItem>
										</Link>
									</>
								)}
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		</div>
	);
};

export default Header;
