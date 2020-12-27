import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
	avatar: {
		width: theme.spacing(7.5),
		height: theme.spacing(7.5),
	},
}));

export default function StickyHeadTable({ allUsersData }) {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const columns = [
		{
			id: 'rank',
			label: '#Rank',
			minWidth: 75,
			align: 'center',
			format: (value) => value.toLocaleString('en-US'),
		},
		{ id: 'avatar', align: 'center', minWidth: 75 },
		{ id: 'username', label: 'Username', align: 'left', minWidth: 175 },
		{
			id: 'points',
			label: 'Points',
			align: 'center',
			minWidth: 175,
			format: (value) => value.toLocaleString('en-US'),
		},
	];

	const rows = allUsersData;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper className={classes.root}>
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
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 50]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
