import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';

import auth from './reducers/auth'
import common from './reducers/common'
import follow from './reducers/follow'
import home from './reducers/home'
import like from './reducers/like'
import modal from './reducers/modal';
import recipe from './reducers/recipe'
import recipeList from './reducers/recipeList'
import profile from './reducers/profile'
import userSettings from './reducers/userSettings'

const reducer = combineReducers({
    auth,
    common,
    follow,
    home,
    like,
    modal,
    recipe,
    recipeList,
    profile,
    userSettings,
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducer, middleware)

export default store