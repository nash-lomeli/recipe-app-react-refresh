import React from 'react'
import './RecipeView.css'

import RecipeList from '../RecipeList/RecipeList'
import { connect } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const mapStateToProps = state => ({
    curated_collections: state.home.curated_collections
})

const RecipeView = props => {

    if (!props.curated_collections) {
        return (
            <div>
                loading..
            </div>
        )
    }

    if (props.curated_collections.length === 0) {
        return (
            <div>
                No collections
            </div>
        )
    }

    props.curated_collections.sort((a, b) => a.display_order>b.display_order ? 1 : -1)

    return (
        <div>
            {
                props.curated_collections.map(curated_collection => {
                    return (
                        <div key={curated_collection.id}  className="recipeView">
                            <div className="recipeView__header">
                                <Row>
                                    <Col className="recipeView__title">
                                        <h2>{curated_collection.title}</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="recipeView__subtitle">
                                        <span>{curated_collection.subtitle}</span>
                                    </Col>
                                </Row>
                                <div className="recipeView__headerBorder"></div>

                            </div>
                            <Row xs={1} sm ={1} md={3} lg={3} xl={3} className="recipeView__recipeList">
                                <RecipeList
                                    collection_recipes={curated_collection.collection_recipe}/>
                            </Row>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default connect(mapStateToProps, () => ({}))(RecipeView);

