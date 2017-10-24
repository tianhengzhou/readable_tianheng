import axios from 'axios';


const config = require('./config.json');

const base_url = process.env.BASE_URL || config.local;

let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    "Content-Type": "application/json",
    'Authorization': token
};

export const getAllPosts = () => {
    return axios.get(`${base_url}/posts`, { headers });
};

export const getPostsByCategories = (category) => {
    return axios.get(`${base_url}/${category}/posts`, { headers });
};

export const getPost = (id) => {
    return axios.get(`${base_url}/posts/${id}`, { headers })
};

export const addPosts = (post, callback) => {
    return axios
        .post(`${base_url}/posts`, post, {headers})
        .then(() => callback())
};

export const updatePost = (post) => {
    return axios.put(`${base_url}/posts/${post.id}`, post, { headers })
};

export const voteOnPost = (id, option) => {
    return axios.post(`${base_url}/posts/${id}`, {option}, { headers })
};

export const deletePost = (id) => {
    return axios.delete(`${base_url}/posts/${id}`, { headers })
};

export const getAllCategories = () => {
    return axios.get(`${base_url}/categories`, { headers })
};

export const getCommentByPost = (id) => {
    return axios.get(`${base_url}/posts/${id}/comments`, { headers })
};

export const getComment = (id) => {
    return axios.get(`${base_url}/comments/${id}`, { headers })
};

export const postComment = (comment) => {
    return axios.post(`${base_url}/comments`, comment, { headers })
};

export const updateComment = (comment) => {
    return axios.put(`${base_url}/comments/${comment.id}`, comment, {headers})
};

export const voteOnComment = (id, option) => {
    return axios.post(`${base_url}/comments/${id}`, {option}, {headers})
};

export const deleteComment = (id, callback) => {
    return axios.delete(`${base_url}/comments/${id}`, {headers}).then(() => callback())
};