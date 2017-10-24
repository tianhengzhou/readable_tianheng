import {
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    RECEIVE_UPDATE_COMMENT,
    RECEIVE_DELETE_COMMENT,
    RECEIVE_VOTE_COMMENT
} from "../constants/ActionTypes";

const initialCommentState = {
    isFetching: false,
};

export function comments(state = initialCommentState, action) {
    const { parentId, comments } = action;
    switch (action.type) {
        case REQUEST_COMMENTS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_COMMENTS:
            return {
                ...state,
                isFetching: false,
                [parentId]: comments
            };
        case RECEIVE_UPDATE_COMMENT:
            return {
                ...state,
                [action.comment.parentId]: state[action.comment.parentId].map(el =>{
                    if (el.id === action.comment.id)
                        return Object.assign({}, el, {body: action.comment.newbody, timestamp: action.timestamp})
                    return el
                })
            }
        case RECEIVE_VOTE_COMMENT:
            return {
                ...state,
                [action.result.parentId]: state[action.result.parentId].map(el => {
                    if(el.id === action.result.id)
                        return Object.assign({}, el, {voteScore: action.result.voteScore})
                    return el
                })
            }
        case RECEIVE_DELETE_COMMENT:
            return {
                ...state,
                [action.parentId]: state[action.parentId].map(el => {
                    if(el.id === action.id)
                        return Object.assign({}, el, {deleted: action.result.ok})
                    return el
                })
            }
        default:
            return state;
    }
}