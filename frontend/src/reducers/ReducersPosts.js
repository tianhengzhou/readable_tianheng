import { REQUEST_POSTS, RECEIVE_POSTS, ADD_POST} from "../constants/ActionTypes";

const initialPostState = {
    isFetching: false,
    posts: [],
    comments: []
};

function posts(state=initialPostState, action) {
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
        default:
            return state;
    }
}