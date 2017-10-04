import * as Action from '../constants/ActionTypes';
import * as Api from '../utils/apis';

function requestCategories() {
    return {
        type: Action.REQUEST_CATEGORIES
    }
}

function receiveCategories(data) {
    return {
        type: Action.RECEIVE_CATEGORIES,
        categories: data.categories,
        lastRequest: Date.now()
    }
}

export function getCategories() {
    return function (dispatch) {
        dispatch(requestCategories());
        return Api.getAllCategories().then(resp => dispatch(receiveCategories(resp.data)))
    }
}