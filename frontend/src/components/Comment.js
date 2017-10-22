import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

function mapStateToProps({comments}) {
	return {
        comments: comments
	};
}

export class Comment extends React.Component {

	render() {
        const comment = this.props.comments[this.props.comment.parentId].filter(c => c.id === this.props.comment.id)[0]
        return (
            <div className="comment-container">
                <div className="comment">
                    <div className="col-xs-11">
                        <div className="comment-body">{comment.body}</div>
                        <div className="comment-footer">{comment.voteScore} points by {comment.author} submitted @ <Moment format="YYYY-MM-DD HH:mm">{comment.timestamp}</Moment></div>
                    </div>
                </div>
            </div>
		);
	}
}

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(Comment)