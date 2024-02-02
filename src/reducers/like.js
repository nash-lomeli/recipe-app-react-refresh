export default (state = {}, action) => {

    switch (action.type) {
        case 'LIKE_LIST_PAGE_LOADED':
            return {
                ...state,
                likes: action.payload.likes
            }
        case 'LIKE_LIST_PAGE_UNLOADED':
            return {}
        case 'FOLLOW_USER': {
            return {
            ...state,
            likes: state.likes.map(like => {
                if (like.user.id === action.payload.follow.id) {
                    return {
                        ...like,
                        user: {
                            ...like.user,
                            is_following: action.payload.follow.is_following
                        }
                    }
                }
                return like
                
                
            })
            }
        }

    }
    return state
}