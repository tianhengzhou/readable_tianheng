import * as Action from '../constants/ActionTypes';
import * as Api from '../utils/apis';

function requestPosts() {
    return {
        type: Action.REQUEST_POSTS
    }
}

function receiveDeletePost(data, id) {
    return {
        id: id,
        result: data,
        lastRequest: Date.now()
    }
}

function receivePosts(data) {
    return {
        type: Action.RECEIVE_POSTS,
        posts: data,
        lastRequest: Date.now()
    }
}

function receiveUpdatePost(result, post, timestamp) {
    return {
        type: Action.RECEIVE_UPDATE_POST,
        post: post,
        result: result,
        timestamp: timestamp,
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

export function postPost(post, callback) {
    return function (dispatch) {
        return Api.addPosts(JSON.stringify(post), callback).then(resp => dispatch(addPost(resp, post)))
    }
}

export function updatePost(post, timestamp) {
    return function (dispatch) {
        return Api.updatePost(post).then(resp => dispatch(receiveUpdatePost(resp, post, timestamp)))
    }
}

export function deletePost(id) {
    return function (dispatch) {
        return Api.deletePost(id).then(resp => dispatch(receiveDeletePost(resp, id)))
    }
}
