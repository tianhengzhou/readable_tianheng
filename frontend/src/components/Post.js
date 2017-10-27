import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Button, Glyphicon, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import Moment from 'react-moment';
import Modal from 'react-modal';
import { getComments } from '../actions/ActionsComments';
import { upVote, downVote, toggleModal } from "../actions/ActionsMisc";
import { deletePost, updatePost } from "../actions/ActionsPosts";
import { customStyles } from "../constants/Misc";

function mapStateToProps({comments, modal}) {
	return {
		comments: comments,
        modal: modal
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
    openPostEditModal = (id) => {
        this.props.toggleModal(id, true)
    }
    closePostEditModal = (id) => {
        this.props.toggleModal(id, false)
    }
    updatePost = (id) => {
        let timestamp = Date.now();
        this.props.updatePost(this.props.post, timestamp);
        this.closePostEditModal(id)
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
					{(!this.props.detail) ?
						<Link to={{ pathname: "/" + post.category +"/" + post.id }}>
							<div className="post-title">{post.title} - {post.category}</div>
						</Link>
						: <div className="post-title">{post.title} - {post.category}</div>
                    }
					<div className="post-comments">comments ({numberOfComments - deletedComments})</div>
					<div className="post-footer">{post.voteScore} points by {post.author} submitted @ <Moment format="YYYY-MM-DD HH:mm">{post.timestamp}</Moment></div>
					{(this.props.detail)?
						<div>
							<Button onClick={() => this.openPostEditModal(post.id)} bsSize="xsmall">edit</Button>
							<Button onClick={() => this.props.deletePost(post.id)} bsSize="xsmall">delete</Button>
						</div>:
						null
					}
				</div>
				<Modal
					style={customStyles} isOpen={this.props.modal[post.id]}
					onRequestClose={() => this.closePostEditModal(post.id)} contentLabel='Modal'>
					<form id={post.id}>
						<FormGroup controlId="formControlsTextarea">
							<ControlLabel>Edit Post</ControlLabel>
							<FormControl type="text" defaultValue={post.title} onChange={e => post.newtitle=e.target.value}/>
							<FormControl componentClass="textarea" defaultValue={post.body} onChange={e => post.newbody=e.target.value}/>
						</FormGroup>
						<Button onClick={() => this.closePostEditModal(post.id)}>Cancel</Button><Button onClick={() => this.updatePost(post.id)}>Save</Button>
					</form>
				</Modal>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
// Implement map dispatch to props
)(Post)