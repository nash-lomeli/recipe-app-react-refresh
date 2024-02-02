import React from 'react'
import './IngredientList.css'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const IngredientList = props => {
    props.item.sort((a, b) => a.display_order > b.display_order ? 1 : -1)

    return (
        <div>
            {
                props.item.map(ingredient => {
                    return (
                            <Row key={ingredient.id}>
                                <Col className="ingredientList__ingredient">
                                <span>· {ingredient.name}</span>
                                </Col>
                            </Row>                            
                    )
                })
            }
        </div>
    )
}

export default IngredientList
