import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Typography from '@material-ui/core/Typography';
import FlagIcon from '@material-ui/icons/Flag';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PersonIcon from '@material-ui/icons/Person';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		width: '100vw',
		backgroundColor: '#fafafa',
	},
});

const Footer = () => {
	const classes = useStyles();
	const [value, setValue] = useState(null);
	const history = useHistory();

	useEffect(() => {
		if (history.location.pathname !== '/challenges') {
			if (history.location.pathname !== '/leaderboard') {
				if (history.location.pathname !== '/profile') {
					setValue(null);
				}
			}
		}
	}, [history.location.pathname]);

	return (
		<div>
			<Box mt={3}>
				<BottomNavigation
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					showLabels
					className={classes.root}
				>
					<BottomNavigationAction
						onClick={() => {
							history.push('/challenges');
						}}
						label='Challenges'
						icon={<FlagIcon />}
					/>
					<BottomNavigationAction
						onClick={() => {
							history.push('/leaderboard');
						}}
						label='Leaderboard'
						icon={<EqualizerIcon />}
					/>
					<BottomNavigationAction
						onClick={() => {
							history.push('/profile');
						}}
						label='Profile'
						icon={<PersonIcon />}
					/>
				</BottomNavigation>
			</Box>
			<Box mt={3}>
				<Typography variant='body2' color='textSecondary' align='center'>
					{'Copyright © '}
					<Link color='inherit' href='https://github.com/loyyo/CaptureTheWDIctory'>
						Capture The WDIctory
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Box>
		</div>
	);
};

export default Footer;
