import { REQUEST_COMMENTS, RECEIVE_COMMENTS } from "../constants/ActionTypes";

const initialCommentState = {
    isFetching: false,
};

export function comments(state = initialCommentState, action) {
    const { parentId, comment } = action;
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
                parentId: comment
            };
        default:
            return state;
    }
}