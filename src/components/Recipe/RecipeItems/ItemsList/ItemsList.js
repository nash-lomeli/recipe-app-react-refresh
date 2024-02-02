import React from 'react'
import IngredientList from './IngredientList/IngredientList'
import './ItemsList.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ItemsList = props => {
    props.items.sort((a, b) => a.display_order > b.display_order ? 1 : -1)

    return (
        <div>
            {
                props.items.map(item => {
                    return (
                        <div key={item.id}>
                        <Row>
                            <Col className="itemsList__item">
                                <h5>For {item.name}</h5>
                            </Col>
                        </Row>
                        <IngredientList
                            item={item.ingredients} />
                        </div>
                    )
                })

            }
            
        </div>
    )
}

export default ItemsList