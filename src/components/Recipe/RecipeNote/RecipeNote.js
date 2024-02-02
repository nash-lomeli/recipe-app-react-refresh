import React from 'react'
import './RecipeNote.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RecipeNote = props => {
    if (!props.recipe_note) {
        return null
    }

    if (!props.recipe_note.body) {
        return null
    }

    return (
        <div className="RecipeDescription">
            <Container>
                <Row>
                    <Col className="RecipeNote__header">
                        <h3>Notes</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="RecipeNote__text">
                        <span>{props.recipe_note.body}</span>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RecipeNote