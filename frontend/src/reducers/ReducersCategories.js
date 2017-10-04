import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from "../constants/ActionTypes";

const initialCategoryState = {
    isFetching: false,
    categories: []
};

export function categories(state = initialCategoryState, action) {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                isFetching: false,
                categories: action.categories
            };
        default:
            return state;
    }
}