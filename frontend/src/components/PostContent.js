import React from 'react';
import { connect } from 'react-redux';
import Header from "./Header";
import {Link} from 'react-router-dom'
import {getComments} from '../actions/ActionsComments';
import { Comments } from "./Comments";

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
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getComments(this.props.postid);
    }

    render() {
        return (
            <div className='main-page'>
                <Header/>
                <div className="col-xs-2"></div>
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
                                            <Post post={post} detail={true}/>
                                            <ol>
                                                {this.props.comments[this.props.postid] === undefined ? null : this.props.comments[this.props.postid]
                                                    .sort(sortBy(this.props.sort.sortOrder + this.props.sort.sortCategory))
                                                    .map((comment) => {
                                                        if (!comment.deleted)
                                                            return <Comment key={comment.id} comment={comment}/>
                                                    })}
                                            </ol>
                                            <div className="add-post">
                                                <Link to={{pathname: "/add/comment/" + post.id}}><Glyphicon
                                                    glyph="plus"/></Link>
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