import React, { Component } from 'react';
import {connect} from 'react-redux'
import Header from './Header'
import Post from './Post';
import PropTypes from 'prop-types';
import { categories } from "../reducers/ReducersCategories";
import {Link} from 'react-router-dom'


class Posts extends Component {

    render() {

        return (
            <div className="main-page">
                <Header/>
                <div className="col-xs-2">
                    {this.props.allCategories.length > 0?
                        this.props.allCategories.map((category) => {
                        return <ol key={category.name}>
                            <Link to={{pathname: `/category/${category.path}`}}>{category.name}</Link>
                        </ol>
                    }): null}
                </div>
                <div className="col-xs-5">
                    <div className="post">
                        <h3>Posts</h3>
                        <ul>
                            {this.props.allPosts
                                .filter(post => {
                                    if (this.props.category) {
                                        if (post.category === this.props.category) {
                                            return -1
                                        }
                                    } else {
                                        return -1
                                    }

                                })
                                .map((post) => {
                                    if (!post.deleted)
                                        return <Post key={post.id} post={post}/>
                                })
                            }
                        </ul>
                    </div>
                    <div className="add-post">
                        <Link to={{pathname: this.props.category !== undefined ? `/add/post/${this.props.category}` : '/add/post' }}>Add Post</Link>
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {};
Posts.defaultProps = {};
function mapStateToProps ({posts, categories}) {
    return {
        allPosts: posts.posts,
        allCategories: categories.categories,
        sort: posts
    }
}
export default connect(
    mapStateToProps,
    undefined
)(Posts);
