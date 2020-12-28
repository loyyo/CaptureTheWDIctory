import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
	avatar: {
		width: theme.spacing(5),
		height: theme.spacing(5),
	},
	button: {
		width: '100%',
		height: theme.spacing(10),
		fontSize: theme.spacing(2),
	},
}));

export default function YourRank({ allUsersData, currentUserData }) {
	const classes = useStyles();
	const history = useHistory();

	const columns = [
		{
			id: 'rank',
			label: '#Rank',
			minWidth: 50,
			align: 'center',
			format: (value) => value.toLocaleString('en-US'),
		},
		{ id: 'avatar', align: 'center', minWidth: 50 },
		{ id: 'username', label: 'Username', align: 'left', minWidth: 150 },
		{
			id: 'points',
			label: 'Points',
			align: 'center',
			minWidth: 75,
			format: (value) => value.toLocaleString('en-US'),
		},
	];

	return (
		<Paper className={classes.root}>
			<Grid container direction='column' alignItems='center'>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{allUsersData.map((row, index) => {
								if (row['email'] === currentUserData.email) {
									return (
										<TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
											{columns.map((column) => {
												const value = row[column.id];
												if (column.id === 'rank') {
													return (
														<TableCell key={column.id} align={column.align}>
															{index + 1}
														</TableCell>
													);
												}
												if (column.id === 'avatar') {
													return (
														<TableCell key={column.id} align={column.align}>
															<Avatar
																variant='rounded'
																alt='default_avatar'
																src={value}
																sizes='150px 150px'
																className={classes.avatar}
																style={{ padding: '0.5rem' }}
															/>
														</TableCell>
													);
												} else {
													return (
														<TableCell key={column.id} align={column.align}>
															{column.format && typeof value === 'number'
																? column.format(value)
																: value}
														</TableCell>
													);
												}
											})}
										</TableRow>
									);
								} else {
									return null;
								}
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<Grid item>
					<Box mt={2} mb={2}>
						<Button
							style={{ textDecoration: 'none' }}
							onClick={() => {
								history.push('/challenges');
							}}
							color='primary'
							variant='contained'
							className={classes.button}
						>
							GET MORE POINTS!
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
}