export default (state = {}, action) => {
    switch (action.type) {
        case 'SETTINGS_SAVED':
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            }
        case 'ASYNC_START':
            return {
                ...state,
                inProgress: true
            }
        case 'SETTINGS_LOAD':
            return {
                ...state,
                currentUser: action.payload ? action.payload.user : null,
            }
    }
    return state
}