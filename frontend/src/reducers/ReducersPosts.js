import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    ADD_POST,
    RECEIVE_SORT,
    RECEIVE_UPDATE_POST,
    RECEIVE_DELETE_POST,
    RECEIVE_VOTE_POST,
} from "../constants/ActionTypes";

const initialPostState = {
    isFetching: false,
    posts: [],
    comments: [],
    sortCategory: 'voteScore',
    sortOrder: 'desc'
};

export function posts(state=initialPostState, action) {
    switch (action.type){
        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat(action.post)
            };
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                posts: action.posts
            };
        case RECEIVE_SORT:
            let sortOrder = state.sortOrder;
            action.sort === state.sortCategory
                ? sortOrder === '-' ? sortOrder = '' : sortOrder = '-'
                : sortOrder = '-';
            return {
                ...state,
                sortOrder: sortOrder,
                sortCategory: action.sort
            }
        case RECEIVE_UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.post.id)
                        return Object.assign({}, post, {
                            body: action.post.newbody || action.post.body,
                            title: action.post.newtitle || action.post.title,
                            timestamp: action.timestamp
                        })
                    return post
                })
            }
        case RECEIVE_VOTE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.result.id)
                        return Object.assign({}, post, {
                            voteScore: action.result.voteScore
                        })
                    return post
                })
            }
        case RECEIVE_DELETE_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.id)
                        return Object.assign({}, post, {
                            deleted: action.result.data.deleted
                        })
                    return post
                })
            }
        default:
            return state;
    }
}