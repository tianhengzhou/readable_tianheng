import { combineReducers } from 'redux'
import { categories } from './ReducersCategories'
import { posts } from './ReducersPosts'
import { comments } from './ReducersComments'

export default combineReducers({
    posts,
    categories,
    comments
})