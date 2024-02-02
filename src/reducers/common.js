const defaultState = {
    appName: 'RT',
    token: null
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'APP_LOAD':
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null,
            }
        case 'REDIRECT':
            return {
                ...state,
                redirectTo: null
            }
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user,
            }
        case 'LOGOUT':
            return {
                ...state,
                redirectTo: '/',
                token: null,
                currentUser: null,
            }
        case 'SETTINGS_SAVED':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user
            }
        case 'SEARCH_ENTERED':
            return {
                ...state,
                redirectTo: action.error ? null : '/results',
                results: action.error ? null : action.payload.recipes,
                query: action.query
            }

        case 'REDIRECT_PROFILE':
            return {
                ...state,
                redirectTo: action.error ? null : `/profiles/${action.payload}/`,
            }

    }
    return state
}