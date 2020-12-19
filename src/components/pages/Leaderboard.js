import React from 'react';
import Table from '../leaderboard/Table';

const Leaderboard = () => {
	return (
		<div className='leaderboard'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='leaderboard-header'>Leaderboard</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='overflow-table'>
							<Table />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
