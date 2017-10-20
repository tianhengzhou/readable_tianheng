import React from 'react';
import { connect } from 'react-redux';
import { getComments, postComments } from '../actions/ActionsComments';

function mapStateToProps(comments) {
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
	constructor(props) {
		super(props);
	}

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
					<div className="post-title">{post.title} - {post.category}</div>
					<div className="post-body">{post.body}</div>
					<Link to={{ pathname: "/posts/" + post.id }}>
						<div className="post-comments">comments ({numberOfComments - deletedComments})</div>
					</Link>
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