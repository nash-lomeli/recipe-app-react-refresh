export default (state = {}, action) => {
    switch(action.type) {
        case 'FOLLOWING_LIST_PAGE_LOADED':
            return {
                ...state,
                following: action.payload.following,
            }
        case 'FOLLOWER_LIST_PAGE_LOADED':
            return {
                ...state,
                followers: action.payload.followers,
            }
        case 'FOLLOW_USER_FOLLOWER_LIST':
            return {
                ...state,
                followers: state.followers.map(follow => {
                    if (follow.id=== action.payload.follow.id) {
                        return {
                            ...follow,
                            is_following: action.payload.follow.is_following
                        }
                    }
                })
            }
        case 'FOLLOW_USER_FOLLOWING_LIST':
                return {
                    ...state,
                    following: state.following.map(follow => {
                        if (follow.id=== action.payload.follow.id) {
                            return {
                                ...follow,
                                is_following: action.payload.follow.is_following
                            }
                        }
                        return follow
                    })
                }
    }
    return state
}