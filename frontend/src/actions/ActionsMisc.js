import {
    RECEIVE_VOTE_COMMENT,
    RECEIVE_VOTE_POST,
    RECEIVE_SORT,
    TOGGLE_MODAL,
    SEND_UPVOTE,
    SEND_DOWNVOTE
} from '../constants/ActionTypes';
import * as Api from '../utils/apis';


function sendUpVote(){
    return {
        type: SEND_UPVOTE
    }
}

function sendDownVote(){
    return {
        type: SEND_DOWNVOTE
    }
}

function receiveUpVote(data) {
    return {
        type: (data.parentId !== undefined) ? RECEIVE_VOTE_COMMENT : RECEIVE_VOTE_POST,
        result: data,
        receivedAt: Date.now()
    }
}

function receiveDownVote(data) {
    return {
        type: (data.parentId !== undefined) ? RECEIVE_VOTE_COMMENT : RECEIVE_VOTE_POST,
        result: data,
        receivedAt: Date.now()
    }
}

export function upVote(id, type) {
    return function (dispatch) {
        dispatch(sendUpVote())
        return type === 'posts'? Api.voteOnPost(id,'upVote').then(resp => dispatch(receiveUpVote(resp.data)))
            : Api.voteOnComment(id, 'upVote').then(resp => dispatch(receiveUpVote(resp.data)))
    }
}

export function downVote(id, type) {
    return function (dispatch) {
        dispatch(sendDownVote())
        let a = '';
        type === 'posts'? a = Api.voteOnPost(id,'downVote').then(resp => dispatch(receiveDownVote(resp.data)))
            : a = Api.voteOnComment(id, 'downVote').then(resp => dispatch(receiveDownVote(resp.data)))
        console.log(a)
        return a
        // return type === 'posts'? Api.voteOnPost(id,'downVote').then(resp => dispatch(receiveDownVote(resp.data)))
        //     : Api.voteOnComment(id, 'downVote').then(resp => dispatch(receiveDownVote(resp.data)))
    }
}

export function sortOrder(data) {
    return {
        type: RECEIVE_SORT,
        sort: data
    }
}

export function toggleModal(modal, state) {
    return {
        type: TOGGLE_MODAL,
        modal: modal,
        state: state
    }
}