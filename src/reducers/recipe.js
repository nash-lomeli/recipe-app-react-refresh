export default (state = {}, action) => {
    switch (action.type) {
        case 'RECIPE_PAGE_LOADED':
            return {
                ...state,
                recipe: action.payload.recipe,
            }
        case 'RECIPE_PAGE_UNLOADED':
            return {}
        case 'RECIPE_PAGE_LIKE':
            return {
                ...state,
                recipe: {
                    ...state.recipe,
                    has_like: action.payload.recipe.has_like,
                    like_count: action.payload.recipe.like_count
                }
            }
        case 'RECIPE_PAGE_COOKED':
            return {
                ...state,
                recipe: {
                    ...state.recipe,
                    has_cooked: action.payload.recipe.has_cooked,
                }
            }
        case 'RECIPE_PAGE_COMPLETED_INSTRUCTION':
            return {
                ...state,
                recipe: {
                    ...state.recipe,
                    instructions: state.recipe.instructions.map(instruction => {
                        if (instruction.id === action.payload.completed_instruction.id) {
                            return {
                                ...instruction,
                                is_completed: action.payload.completed_instruction.is_completed
                            }
                        }
                        return instruction
                        
                    })
                }
            }
        case 'RECIPE_PAGE_NOTE_SAVED':
            return {
                ...state,
                recipe: {
                    ...state.recipe,
                    recipe_note: {
                        ...state.recipe.recipe_note,
                        body: action.payload.note.body //is this okay to do?
                    }
                }
            }
    }

    return state
}