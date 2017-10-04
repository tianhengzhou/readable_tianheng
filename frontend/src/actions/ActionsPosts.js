import * as Action from '../constants/ActionTypes';
import * as Api from '../utils/apis';

function requestPosts() {
    return {
        type: Action.REQUEST_POSTS
    }
}

function receivePosts(data) {
    return {
        type: Action.RECEIVE_POSTS,
        posts: data,
        lastRequest: Date.now()
    }
}

function addPost(resp, post) {
    return {
        type: Action.ADD_POST,
        post: post,
        response: resp,
        lastRequest: Date.now()
    }
}

export function getPosts() {
    return function (dispatch) {
        dispatch(requestPosts());
        return Api.getAllPosts().then(resp => dispatch(receivePosts(resp.data)))
    }
}

export function postPost(post) {
    return function (dispatch) {
        return Api.addPosts(JSON.stringify(post)).then(resp => dispatch(addPost(resp, post)))
    }
}