import { combineReducers } from 'redux'
import { categories } from './ReducersCategories'
import { posts } from './ReducersPosts'
import { comments } from './ReducersComments'
import { reducer as formReducer } from 'redux-form'
import { modal } from "./ReducersMisc";

export default combineReducers({
    posts,
    categories,
    comments,
    modal,
    form: formReducer
})