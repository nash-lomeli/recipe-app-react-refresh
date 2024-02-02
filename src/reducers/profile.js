export default (state = {}, action) => {
    switch (action.type) {

        case 'PROFILE_PAGE_LOADED':
            return {
                ...state,
                profile: action.payload.profile,
            }
        case 'PROFILE_FOLLOW_USER':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    is_following: action.payload.follow.is_following,
                    followers: action.payload.follow.followers
                }
            }
        
        case 'PROFILE_PAGE_UNLOADED':
            return {}
    }

    return state
}