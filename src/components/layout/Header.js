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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	colorInherit: {
		color: '#000000',
		backgroundColor: '#000000',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Header = () => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState(null);
	const [error, setError] = useState('error');
	const open = Boolean(anchorEl);

	const { currentUser, logout } = useAuth();

	async function handleLogout() {
		setError('');
		try {
			await logout();
		} catch {
			setError('Failed to log out');
			console.log(error);
		}
	}

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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

						<Button>
							<Link className='href' to='/wyzwania'>
								Challenges
							</Link>
						</Button>
						<Button>
							<Link className='href' to='/tabela'>
								Leaderboard
							</Link>
						</Button>

						<div className=''>
							<IconButton
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenu}
								color='inherit'
							>
								<AccountCircle />
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
											<Link className='href-black' to='/login'>
												Login
											</Link>
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<Link className='href-black' to='/rejestracja'>
												Sign Up
											</Link>
										</MenuItem>
									</>
								)}
								{currentUser !== null && (
									<>
										<MenuItem onClick={handleClose}>
											<Link className='href-black' to='/profil'>
												Profile
											</Link>
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<Link className='href-black' to='/profil/edytuj'>
												Settings
											</Link>
										</MenuItem>
										<MenuItem onClick={handleClose}>
											<Link onClick={handleLogout} className='href-black' to='/'>
												Logout
											</Link>
										</MenuItem>
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
