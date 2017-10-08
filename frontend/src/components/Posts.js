import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { categories } from "../reducers/ReducersCategories";

class Posts extends Component {

    render() {

        return (
            <div className="main-page">
                <div className="col-xs-5">
                    <div className="posts">
                        <h3>Posts</h3>
                        <ol>
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
                                        return <p>{post.body} <span>{post.category}</span></p>
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {};
Posts.defaultProps = {};
function mapStateToProps ({posts, categories}) {
    console.log(posts)
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
