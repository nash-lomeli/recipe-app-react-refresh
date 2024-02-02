import React from 'react'
import RecipePreviewV2 from '../../Utilities/RecipePreviewV2/RecipePreviewV2'

import Col from 'react-bootstrap/Col'

const RecipeList = props => {
    if (!props.collection_recipes) {
        return (
            <div>
                loading..
            </div>
        )
    }

    if (props.collection_recipes.length === 0) {
        return (
            <div>
                No Recipes
            </div>
        )
    }

    props.collection_recipes.sort((a, b) => a.display_order>b.display_order ? 1 : -1)

    return (
        <>
            {
            props.collection_recipes.map(collection_recipe => {
                return (
                    <Col key={collection_recipe.id}>
                        <RecipePreviewV2 
                            recipe={collection_recipe.recipe}
                            type="recipe"/>
                    </Col>

                )
            })
            }
        </>
    )
}

export default RecipeList
