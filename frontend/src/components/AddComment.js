import React from 'react';
import { connect } from 'react-redux';
import CommentForm from "./CommentForm";
import uuidv1 from 'uuid/v1'
import { postComment } from "../actions/ActionsComments";


function mapStateToProps({posts, categories}) {
	return {
	    posts: posts.posts,
        categories: categories.categories
	};
}

function mapDispatchToState(dispatch) {
    return {
        postComment: (data) => dispatch(postComment(data))
    }
}

export class AddComment extends React.Component {
    submit = (value, content) => {
        value.id = uuidv1();
        value.timestamp = Date.now();
        value.parentId = this.props.parentId;
        this.props.postComment(value);
        this.props.history.push(`/posts/${this.props.parentId}`)

    }
	render() {
        const category = this.props.posts.filter(p => p.id === this.props.parentId).map(c => c.category)[0];
        console.log(category);
        return (
			<CommentForm onSubmit={this.submit} initialValues={{category: category}}/>
		);
	}
}

export default connect(
	mapStateToProps,
    mapDispatchToState
)(AddComment)