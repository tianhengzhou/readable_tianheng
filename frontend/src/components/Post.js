import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Button, Glyphicon} from 'react-bootstrap'
import Moment from 'react-moment'

import { getComments } from '../actions/ActionsComments';
import { upVote, downVote, toggleModal } from "../actions/ActionsMisc";
import { deletePost, updatePost } from "../actions/ActionsPosts";

function mapStateToProps({comments}) {
	return {
		comments: comments
	};
}

function mapDispatchToProps(dispatch) {
	return {
        getComments: (id) => dispatch(getComments(id)),
        upVote: (id, type) => dispatch(upVote(id, type)),
        downVote: (id, type) => dispatch(downVote(id, type)),
        deletePost: (id, type) => dispatch(deletePost(id)),
        updatePost: (post, timestamp) => dispatch(updatePost(post, timestamp)),
        toggleModal: (modal, state) => dispatch(toggleModal(modal, state))
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
				<div className="col-xs-1">
					<div className="up-vote">
						<Button onClick={() => this.props.upVote(post.id, 'posts')} type="button" bsSize="small">
							<Glyphicon glyph="chevron-up"/>
						</Button>
					</div>
					<div className="down-vote">
						<Button onClick={() => this.props.downVote(post.id, 'posts')} type="button" bsSize="small">
							<Glyphicon glyph="chevron-down"/></Button>
					</div>
				</div>
				<div className="col-xs-11">
					<Link to={{ pathname: "/posts/" + post.id }}>
						<div className="post-title">{post.title} - {post.category}</div>
					</Link>
					<div className="post-comments">comments ({numberOfComments - deletedComments})</div>
					<div className="post-footer">{post.voteScore} points by {post.author} submitted @ <Moment format="YYYY-MM-DD HH:mm">{post.timestamp}</Moment></div>
					<div>
						<Button onClick={() => this.props.deletePost(post.id, 'posts')} bsSize="xsmall">delete</Button>
					</div>
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