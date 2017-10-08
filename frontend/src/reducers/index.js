import { combineReducers } from 'redux'
import { categories } from './ReducersCategories'
import { posts } from './ReducersPosts'

export default combineReducers({
    posts,
    categories
})