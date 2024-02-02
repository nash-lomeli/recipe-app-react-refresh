export default (state = {}, action) => {

    switch (action.type) {
      case 'HOME_PAGE_LIKE_RECIPES':
        return {
          ...state,
          curated_collections: state.curated_collections.map(curated_collection => {
              return {
                ...curated_collection,
                collection_recipe: curated_collection.collection_recipe.map(collection_recipe => {

                  if (collection_recipe.recipe.slug === action.payload.recipe.slug) {
                    return {
                      ...collection_recipe,
                      recipe: {
                        ...collection_recipe.recipe,
                        has_like: action.payload.recipe.has_like,
                        like_count: action.payload.recipe.like_count

                      }
                      }
                  }
                  return collection_recipe

                  
                  })
                }
              })
            }
        
      case 'HOME_PAGE_LOADED':
        return { 
          ...state,
          curated_collections: action.payload.curated_collections 
        }
    }
    return state;
}