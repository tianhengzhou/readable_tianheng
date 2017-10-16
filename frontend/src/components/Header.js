import React from 'react';
import Headroom from 'react-headroom'
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
	render() {
		return (
			<Headroom>
				<Link to='/'>
					<div className='header'>
						<h1>Readable</h1>
					</div>
				</Link>
			</Headroom>
		);
	}
}