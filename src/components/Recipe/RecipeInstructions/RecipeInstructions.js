import React from 'react'
import './RecipeInstructions.css'

import { connect } from 'react-redux'

import InstructionsList from './InstructionsList/InstructionsList'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const mapDispatchToProps = dispatch => ({
    showNoteForm: slug => 
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                modalType: 'NOTE',
                modalProps: {
                    show: true,
                    title: 'Your Note'
                }
            }
        }),
    showRegisterList: () => 
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                modalType: 'REGISTER',
                modalProps: {
                    show: true,
                    title: ''
                }
            }
        })
})

const RecipeInstructions = props => {
    const instructions = props.recipe.instructions
    const recipe = props.recipe

    const noteFormHandler = () => {
        props.showNoteForm();
    }

    const registerHandler = () => {
        props.showRegisterList();
    }

    return (
        <div className="RecipeInstructions">
            <Container>
                <Row>
                    <Col className="RecipeInstructions__header">
                        <h3>Instructions</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="recipeInstructions__subHeader">
                        <button onClick={() => {props.currentUser ? noteFormHandler() : registerHandler()}}>
                            {recipe.recipe_note && recipe.recipe_note.body ? 'Edit Note' : 'Add Note'}
                        </button>
                    </Col>
                </Row>
                    <InstructionsList
                        instructions={instructions}
                        currentUser={props.currentUser}
                        registerHandler={registerHandler}/>
            </Container>
        </div>
    )
}
export default connect(() => ({}), mapDispatchToProps)(RecipeInstructions)