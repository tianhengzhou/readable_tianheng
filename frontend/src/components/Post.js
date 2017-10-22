import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getComments } from '../actions/ActionsComments';

function mapStateToProps({comments}) {
	return {
		comments: comments
	};
}

function mapDispatchToProps(dispatch) {
	return {
        getComments: (id) => dispatch(getComments(id))
    };
}

export class Post extends React.Component {

    componentDidMount() {
        this.props.getComments(this.props.post.id)
    }

    render() {
		const { post, comments } = this.props;
        const numberOfComments = comments[post.id] === undefined ? 0 : comments[post.id].length
        const deletedComments = comments[post.id] === undefined ? 0 : comments[post.id].filter(c => c.deleted === true).length

        return (
			<div className='edit-post'>
				<div className="col-xs-11">
					<Link to={{ pathname: "/posts/" + post.id }}>
						<div className="post-title">{post.title} - {post.category}</div>
					</Link>
					<div className="post-comments">comments ({numberOfComments - deletedComments})</div>
				</div>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
// Implement map dispatch to props
)(Post)