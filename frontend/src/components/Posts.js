import React, { Component } from 'react';
import {connect} from 'react-redux'
import Header from './Header'
import Post from './Post';
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
import Sort from "./Sort";

class Posts extends Component {

    render() {

        return (
            <div className="main-page">
                <Header/>
                <div className="col-xs-2">
                    {this.props.allCategories.length > 0?
                        this.props.allCategories.map((category) => {
                        return <ol key={category.name}>
                            <Link to={{pathname: `/${category.path}`}}>{category.name}</Link>
                        </ol>
                    }): null}
                </div>
                <div className="col-xs-5">
                    <div className="post">
                        <h3>Posts</h3>
                        <Sort/>
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
                                .sort(sortBy(this.props.sort.sortOrder + this.props.sort.sortCategory))
                                .map((post) => {
                                    if (!post.deleted)
                                        return <Post key={post.id} post={post}/>
                                })
                            }
                        </ul>
                    </div>
                    <div className="add-post">
                        <Link to={{pathname: this.props.category !== undefined ? `/create/post/${this.props.category}` : '/create/post/' }}>Add Post</Link>
                    </div>
                </div>
            </div>
        );
    }
}

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
