export default (state = {}, action) => {
    switch (action.type) {
        case 'PROFILE_PAGE_LIKE_RECIPES':
            return {
                ...state,
                recipes: state.recipes.map(recipe => {
                    if (recipe.slug === action.payload.recipe.slug) {
                        return {
                            ...recipe,
                            has_like: action.payload.recipe.has_like,
                            like_count: action.payload.recipe.like_count
                        }
                    }
                    return recipe
                })
            }
        case 'PROFILE_PAGE_AUTHOR_LOADED':
            return {
                ...state,
                recipes: action.payload.recipes
            }
        case 'PROFILE_PAGE_COOK_LOADED':
            return {
                ...state,
                recipes: action.payload.recipes
            }
        case 'PROFILE_PAGE_LIKED_LOADED':
            return {
                ...state,
                recipes: action.payload.recipes
            }
        case 'PROFILE_PAGE_FEED_LOADED':
            return {
                ...state,
                recipes: action.payload.recipes
            }
        case 'PROFILE_PAGE_UNLOADED':
            return {}

    }
    return state
}