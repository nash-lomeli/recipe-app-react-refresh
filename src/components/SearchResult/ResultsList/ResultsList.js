import React from 'react'

import RecipePreview from '../../Utilities/RecipePreviewV2/RecipePreviewV2'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const ResultsList = props => {

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
        <>
            <Row xs={1} sm={1} md={1} lg={1}>
            {
                props.recipes.map(recipe => {
                    return (
                        <Col key={recipe.id}>
                            <RecipePreview
                                recipe={recipe}
                                type="recipe"/>
                        </Col>
                    )
                })
            }
            </Row>
        </>
    )
}

export default ResultsList
