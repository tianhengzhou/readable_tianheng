import { categories } from './categories/reducer';
import { comments } from './comments/reducer';
import { posts } from './posts/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    posts,
    comments,
    categories
})