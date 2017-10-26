import React from 'react';
import { connect } from 'react-redux';
import { postPost } from "../actions/ActionsPosts";
import PostForm from './PostForm'
import uuidv4 from 'uuid/v4'

function mapStateToProps({posts, categories}) {
	return {
		posts: posts.posts,
		categories: categories.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		postPost: (data, callback) => dispatch(postPost(data, callback))
	}
}

export class AddPost extends React.Component {

    submit = (values, context) => {
        values.timestamp = Date.now();
        values.id = uuidv4();
        values.voteScore = 1;
        values.deleted = false;
        this.props.postPost(values, () => {
            this.props.category ? this.props.history.push(`/${this.props.category}`) : this.props.history.push('/')
        });
    };

	render() {
		return (
			<PostForm onSubmit={this.submit} initialValues={{category: this.props.category, categories: this.props.categories}}/>
        );
	}
}

export default connect(
	mapStateToProps,
    mapDispatchToProps
)(AddPost)