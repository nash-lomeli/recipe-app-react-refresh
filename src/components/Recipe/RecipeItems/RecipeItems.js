import React from 'react'
import './RecipeItems.css'

import ItemsList from './ItemsList/ItemsList'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RecipeItems = props => {

    return (
        <div className="recipeItems">
            <Container>
                <Row>
                    <Col className="recipeItems__header">
                        <h3>Items</h3>
                    </Col>
                </Row>
                    <ItemsList
                        items={props.items}/>
            </Container>
        </div>
    )
}

export default RecipeItems
