import React from 'react'
import './InstructionIngredientList.css'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


const InstructionIngredientList = props => {
    return (
        <div>
            {
                props.instruction_ingredients.map(instruction_ingredient => {
                    return (
                        <Row key={instruction_ingredient.id}>
                            <Col className="instructionIngredientList__body">
                                <span>· {instruction_ingredient.body}</span>
                            </Col>
                        </Row>
                    )
                })
            }
        </div>
    )
}

export default InstructionIngredientList
