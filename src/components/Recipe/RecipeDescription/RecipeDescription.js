import React from 'react'
import './RecipeDescription.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RecipeDescription = props => {
    const recipe = props.recipe
    return (
        <div className="RecipeDescription">
            <Container>
                <Row>
                    <Col className="RecipeDescription__header">
                        <h3>Description</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="RecipeDescription__text">
                        <span>{recipe.description}</span>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RecipeDescription
