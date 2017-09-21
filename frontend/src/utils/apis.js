import fs from 'fs';
import Yaml from 'js-yaml';
import axios from 'axios';

const config = Yaml.safeLoad(fs.readFileSync('../config/base_url.yml', 'utf8'));

const base_url = config[process.env.BASE_URL] || config.local;

const headers = {
    'Accept': 'applicaiton/json',
    'Authorization': 'authorized'
};

export const getAllPosts = () => {
    return axios.get(`${base_url}/posts`, {headers});
};

export const getPostsByCategories = (category) => {
    return axios.get(`${base_url}/${category}/posts`, {headers});
};

export const getPost = (id) => {
    return axios.get(`${base_url}/posts/${id}`, {headers})
};

export const addPosts = (post, callback) => {
    return axios
        .post(`${base_url}/posts`, post, headers)
        .then(() => callback())
};

export const updatePost = (post, callback) => {
    return axios
        .put(`${base_url}/posts/${post.id}`, post, {headers})
        .then(() => callback())
};

export const voteOnPost = (id, option) => {
    return axios.put(`${base_url}/posts/${id}`, {option}, {headers})
};

export const deletePost = (id, callback) => {
    return axios.delete(`${base_url}/posts/${id}`, {headers}).then(() => callback())
};

export const getCatogories = () => {
    return axios.get(`${base_url}/categories`, {headers})
};

export const getCommentByPost = (id) => {
    return axios.get(`${base_url}/posts/${id}/comments`, {headers})
};

export const getComment = (id) => {
    return axios.get(`${base_url}/comments/${id}`, {headers})
};

export const postComment = (comment) => {
    return axios.post(`${base_url}/comments`, comment, {headers})
};

export const updateComment = (comment) => {
    return axios.put(`${base_url}/comments/${comment.id}`, comment, {headers})
};

export const voteOnComment = (id, option) => {
    return axios.put(`${base_url}/comments/${id}`, {option}, {headers})
};

export const deleteComment = (id, callback) => {
    return axios.delete(`${base_url}/comments/${id}`, {headers}).then(() => callback())
};