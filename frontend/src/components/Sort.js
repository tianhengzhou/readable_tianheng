import React from 'react';
import { connect } from 'react-redux';
import { sortOrder } from "../actions/ActionsMisc";
import { Button } from 'react-bootstrap';

function mapDispatchToProps(dispatch) {
	return {
	    sortOrder: (data) => dispatch(sortOrder(data))
	};
}

export class Sort extends React.Component {

	render() {
		return (
            <div className="sortbar">
                Sort by:
                <Button type="button" onClick={() => this.props.sortOrder("voteScore")}>Score</Button>
                <Button type="button" onClick={() => this.props.sortOrder("timestamp")}>Submit Time</Button>
                {
                    (this.props.comment) ? null : <Button type="button" onClick={() => this.props.sortOrder("category")}>Category</Button>

                }

            </div>
		);
	}
}

export default connect(
	undefined,
	mapDispatchToProps
)(Sort)