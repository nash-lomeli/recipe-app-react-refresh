import React, { Component } from 'react'
import './index.css'

import { connect } from 'react-redux'
import agent from '../../agent'

import RecipeSummary from './RecipeSummary/RecipeSummary'
import RecipeDescription from './RecipeDescription/RecipeDescription'
import RecipeItems from './RecipeItems/RecipeItems'
import RecipeInstructions from './RecipeInstructions/RecipeInstructions'
import RecipeNote from './RecipeNote/RecipeNote'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const mapStateToProps = state => ({
    ...state.recipe,
    currentUser: state.common.currentUser,
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload =>
        dispatch({ 
            type: 'RECIPE_PAGE_LOADED',
            payload
    }),
    onUnload: () =>
        dispatch({
            type: 'RECIPE_PAGE_UNLOADED',
        })
})

class Recipe extends Component {
    UNSAFE_componentWillMount() {

        // console.log('UNSAFE_componentWillMount - this.props',this.props)
        // console.log('UNSAFE_componentWillMount - agent.Recipes.get',agent.Recipes.get('recipe-5-mek8lg'))
        // console.log('UNSAFE_componentWillMount - this.props.onLoad(agent.Recipes.get(this.props.match.params.slug)',this.props.onLoad(agent.Recipes.get('recipe-5-mek8lg')))
        //console.log('UNSAFE_componentWillMount - this.props',agent.Recipes.all())
        // this.props.onLoad(agent.Recipes.get('recipe-5-mek8lg'))
        // \\this.props.onLoad(agent.Recipes.get(this.props.recipe.slug))

        this.props.onLoad(agent.Recipes.get(this.props.match.params.slug))
        // console.log('UNSAFE_componentWillMount this.props.onLoad',this.props.onLoad(agent.Recipes.all()))
    }

    UNSAFE_componentWillUnmount() {
        this.props.onUnload()
    }

    render() {
        console.log('render()',this.props)



        if (!this.props.recipe) {
            return (
                <div>
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                </div>
            )
        }

        return (
            <div className="recipe">
                <Container>
                    <Row>
                        <RecipeSummary
                            recipe={this.props.recipe}
                            currentUser={this.props.currentUser}/>
                    </Row>
                    <Row>
                        <Col className="recipe__border">
                        </Col>
                    </Row>
                    <Row>
                        <RecipeDescription
                            recipe={this.props.recipe}/>
                    </Row>
                    <Row>
                        <RecipeItems
                            items={this.props.recipe.items}/>
                    </Row>
                    <Row>
                        <RecipeNote
                            recipe_note={this.props.recipe.recipe_note}/>
                    </Row>
                    <Row>
                        <RecipeInstructions
                            recipe={this.props.recipe}
                            currentUser={this.props.currentUser}/>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)