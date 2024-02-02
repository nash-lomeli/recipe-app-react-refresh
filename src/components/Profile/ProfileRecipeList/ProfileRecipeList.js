import React from 'react'
import './ProfileRecipeList.css'
import RecipePreviewV2 from '../../Utilities/RecipePreviewV2/RecipePreviewV2'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ProfileRecipeList = props => {
    if (!props.recipes) {
        return (
            <div>
                loading..
            </div>
        )
    }

    if (props.recipes.length === 0) {
        return (
            <div>
                No Recipes
            </div>
        )
    }

    return (
        <div className="profileRecipeList">
            <Row xs={1} sm={1} md={2} lg={2}>
            {
                props.recipes.map(recipe => {
                    return (
                        <Col key={recipe.id}>
                            <RecipePreviewV2
                                recipe={recipe}
                                type="profile"/>
                        </Col>
                    )
                })
            }
            </Row>
        </div>
    )
}

export default ProfileRecipeList
