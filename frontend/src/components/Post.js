import React from 'react';
import { connect } from 'react-redux';


function mapStateToProps(state) {
	return {
	};
}

export class Post extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (

		);
	}
}

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(Post)