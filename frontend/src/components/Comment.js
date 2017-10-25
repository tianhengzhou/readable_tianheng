import React from 'react';
import Moment from 'react-moment';
import Modal from 'react-modal'
import {Button, Glyphicon, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import { connect } from 'react-redux';
import { updateComment, deleteComment} from "../actions/ActionsComments";
import { upVote, downVote, toggleModal } from "../actions/ActionsMisc";
import { customStyles } from "../constants/Misc";

function mapStateToProps({comments, modal}) {
	return {
        comments: comments,
        modal: modal
	};
}

export class Comment extends React.Component {
    openCommentEditModal = (id) => {
        this.props.toggleModal(id, true)
    }
    closeCommentEditModal = (id) => {
        this.props.toggleModal(id, false)
    }
    updateComment = (id) => {
        let timestamp = Date.now();
        this.props.updateComment(this.props.comment, timestamp);
        this.closeCommentEditModal(id)
    }
	render() {
        const comment = this.props.comments[this.props.comment.parentId].filter(c => c.id === this.props.comment.id)[0];
        return (
            <div className="comment-container">
                <div className="comment">
                    <div className="col-xs-1">
                        <div className="up-vote">
                            <Button onClick={() => this.props.upVote(comment.id, 'comments')} type="button" bsSize="small">
                                <Glyphicon glyph="chevron-up"/>
                            </Button>
                        </div>
                        <div className="down-vote">
                            <Button onClick={() => this.props.downVote(comment.id, 'comments')} type="button" bsSize="small">
                                <Glyphicon glyph="chevron-down"/></Button>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <div className="comment-body">{comment.body}</div>
                        <div className="comment-footer">{comment.voteScore} points by {comment.author} submitted @ <Moment format="YYYY-MM-DD HH:mm">{comment.timestamp}</Moment></div>
                        <div>
                            <Button onClick={() => this.openCommentEditModal(comment.id)} bsSize="xsmall">edit</Button>
                            <Button onClick={() => this.props.deleteComment(comment.id, comment.parentId)} bsSize="xsmall">delete</Button>
                        </div>
                    </div>
                    <Modal
                        style={customStyles} isOpen={this.props.modal[comment.id]}
                        onRequestClose={() => this.closeCommentEditModal(comment.id)} contentLabel='Modal'
                    >
                        <form id={comment.id}>
                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Edit comment</ControlLabel>
                                <FormControl componentClass="textarea" defaultValue={comment.body} onChange={e => this.props.comment.newbody=e.target.value}/>
                            </FormGroup>

                            <Button onClick={() => this.closeCommentEditModal(comment.id)}>Cancel</Button><Button onClick={() => this.updateComment(comment.id)}>Save</Button>
                        </form>
                    </Modal>
                </div>
            </div>
		);
	}
}

function mapDispatchToProps (dispatch) {
    return {
        upVote: (id, type) => dispatch(upVote(id, type)),
        downVote: (id, type) => dispatch(downVote(id, type)),
        deleteComment: (id, parentId) => dispatch(deleteComment(id ,parentId)),
        updateComment: (comment, timestamp) => dispatch(updateComment(comment, timestamp)),
        toggleModal: (modal, state) => dispatch(toggleModal(modal, state)),
    }
}

export default connect(
	mapStateToProps,
    mapDispatchToProps
)(Comment)