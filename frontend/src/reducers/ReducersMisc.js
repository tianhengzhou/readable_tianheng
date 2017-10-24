import {TOGGLE_MODAL} from '../constants/ActionTypes'

export function modal(state={}, action) {
    switch (action.type){
        case TOGGLE_MODAL:
            return {
                ...state,
                [action.modal]: action.state
            }
        default:
            return state
    }
}