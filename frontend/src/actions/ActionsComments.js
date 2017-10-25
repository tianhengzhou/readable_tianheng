import * as Action from '../constants/ActionTypes';
import * as Api from '../utils/apis';

function requestComments() {
    return {
        type: Action.REQUEST_COMMENTS
    }
}

function receiveComments(parentId, data) {
    return {
        type: Action.RECEIVE_COMMENTS,
        parentId: parentId,
        comments: data,
        lastRequest: Date.now()
    }
}

function receiveUpdateComment(result, comment, timestamp) {
    return {
        type: Action.RECEIVE_UPDATE_COMMENT,
        comment: comment,
        result: result,
        timestamp: timestamp,
        lastRequest: Date.now()
    }
}

function receiveDeleteComment(resp, id, parentId) {
    return {
        type: Action.RECEIVE_DELETE_COMMENT,
        id: id,
        parentId: parentId,
        result: resp,
        lastRequest: Date.now()
    }
}

function addComment(resp, comment) {
    return {
        type: Action.ADD_COMMENT,
        comment: comment,
        response: resp,
        lastRequest: Date.now()
    }
}

export function getComments(id) {
    return function (dispatch) {
        dispatch(requestComments());
        return Api.getCommentByPost(id).then(resp => dispatch(receiveComments(id, resp.data)))
    }
}

export function postComment(comment) {
    return function (dispatch) {
        return Api.postComment(JSON.stringify(comment)).then(resp => dispatch(addComment(resp, comment)))
    }
}

export function updateComment(comment, timestamp) {
    return function (dispatch) {
        return Api.updateComment(comment).then(resp => dispatch(receiveUpdateComment(resp, comment, timestamp)))
    }
}

export function deleteComment(id, parentId) {
    return function (dispatch) {
        return Api.deleteComment(id).then(resp => dispatch(receiveDeleteComment(resp, id, parentId)))
    }
}