import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'https://recipe-app-api-refresh-535-92934bae30c0.herokuapp.com/api'
//const API_ROOT = 'http://127.0.0.1:8000/api'

const responseBody = res => {
  console.log('responseBody',res.body)
  return res.body
}

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  get: url => {
    return superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
  },
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) => {
    return superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)

  }
}

const Auth = {
  current: () =>
    requests.get('/users/settings/'),
  login: (email, password) =>
    requests.post('/users/login/', { user: { email, password } }),
  register: (email, username, password) => 
    requests.post('/users/register/', { user: { email, username, password }}),
  save: user => {
    return requests.put('/users/settings/', user )
  }
}

const CompletedInstructions = {
  complete: instruction => 
    requests.post(`/completed_instructions/${instruction}/`),
}

const Cooked = {
  cooked: slug =>
    requests.post(`/cooked/${slug}/`)
}

const CuratedCollections = {
  all: page => 
    requests.get(`/curated_collections/`),
}

const Follow = {
  follow: user =>
    requests.post(`/follow/${user}/`),
  followingList: user =>
    requests.get(`/follow/${user}/following/`),
  followerList: user =>
    requests.get(`/follow/${user}/followers/`),
}

const Notes = {
  addNote: (slug, note) => 
    requests.post(`/notes/${slug}/`, { note_recipe: note }),
  updateNote: (slug, id, note) => 
    requests.put(`/notes/${slug}/${id}/`, note ),
}

const Recipes = {
  all: page => 
    requests.get(`/recipes`),
  search: query => 
    requests.get(`/recipes/q?search=${query}`),
  get: slug => {
    console.log('const Recipes get: slug',slug)
    return requests.get(`/recipes/${slug}/`)
  },
  byAuthor: id =>
    requests.get(`/recipes?author=${id}`),
  byLiked: id =>
    requests.get(`/recipes?liked=${id}`),
  byCooked: id =>
    requests.get(`/recipes?cooked=${id}`),
  feed: () =>
    requests.get(`/recipes/feed/`),
}

const Like = {
  like: slug =>
  requests.post(`/likes/${slug}/`),
  likeList: slug =>
    requests.get(`/likes/${slug}/list/`)
}

const Profiles = {
  get: id => {
    return requests.get(`/profiles/${id}/`)
  }
}

export default {
  Auth,
  CompletedInstructions,
  Cooked,
  CuratedCollections,
  Follow,
  Like,
  Notes,
  Profiles,
  Recipes,
  setToken: _token => { token = _token; }
}