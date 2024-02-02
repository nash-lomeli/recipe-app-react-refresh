import React from 'react'
import './Banner.css'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Banner = () => {
    return (
                <Row>
                    <Col>
                        <Jumbotron className="jumbotron">
                            <h1>Recipes from <br></br>local favorites near you!</h1>
                        </Jumbotron>                   
                    </Col>
                </Row>
    )
}

export default Banner
