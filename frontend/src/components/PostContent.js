import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Header from "./Header";
import { Link } from 'react-router-dom'
import {getComments} from '../actions/ActionsComments';
import Comment from "./Comment";

function mapStateToProps({posts, categories, comments}) {
	return {
        allPosts: posts.posts,
        allCategories: categories.categories,
        comments: comments,
	};
}

function mapDispatchToProps(dispatch) {
    return {
        getComments: (id) => dispatch(getComments(id)),
    }
}

export class PostContent extends React.Component {

    componentDidMount() {
        console.log(this.props.postid);
        this.props.getComments(this.props.postid);
    }

    render() {
        return (
            <div className='main-page'>
                <Header/>
                <div className="col-xs-2"/>
                <div className="col-xs-6">
                    <div className="posts">
                        <h3>Posts</h3>
                        {this.props.allPosts
                            .filter(post => post.id === this.props.postid)
                            .map((post) => {
                                if (post.deleted) {
                                    return <h3 key={post.id}>Post has been deleted</h3>
                                } else {
                                    return (
                                        <div key={post.id}>
                                            <div className="post-title">{post.title} - {post.category}</div>
                                            <div className="post-body">{post.body}</div>
                                            <div className="post-footer">{post.voteScore} points by {post.author} submitted @ <Moment format="YYYY-MM-DD HH:mm">{post.timestamp}</Moment></div>
                                            <div className="post-comments">comments ({this.props.comments[this.props.postid] === undefined ? 0 : this.props.comments[this.props.postid].length})</div>

                                            <ol>
                                                {this.props.comments[this.props.postid] === undefined ? null : this.props.comments[this.props.postid]
                                                    .map((comment) => {
                                                        if (!comment.deleted)
                                                            return <Comment key={comment.id} comment={comment}/>;
                                                        else
                                                            return <span>Comment has been deleted</span>
                                                    })}
                                            </ol>
                                            <div className="add-post">
                                                <Link to={{pathname: "/add/comment/" + post.id}}>Add Comment</Link>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
	mapStateToProps,
    mapDispatchToProps
)(PostContent)