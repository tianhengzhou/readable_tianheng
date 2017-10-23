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