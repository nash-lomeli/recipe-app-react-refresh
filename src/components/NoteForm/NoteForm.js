import React, { Component } from 'react'
import './NoteForm.css'
import { connect } from 'react-redux'
import agent from '../../agent'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button' 

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    recipe: state.recipe.recipe
})

const mapDispatchToProps = dispatch => ({

    onSubmitForm: payload => {
        dispatch({
            type: 'RECIPE_PAGE_NOTE_SAVED',
            payload: payload
        })
    },
})

class NoteForm extends Component {
    constructor() {
        super()

        this.state = {
            body: ''
        }

        this.updateState = field => ev => {
            const state = this.state
            const newState = Object.assign(
                {},
                state,
                {[field]: ev.target.value}
            )
            this.setState(newState)
        }

        this.submitForm = ev => {
            console.log('submitForm')
            ev.preventDefault()
            const slug = this.props.recipe.slug
            const id = this.props.recipe.recipe_note.id
            const note = Object.assign({}, this.state)
            const promise = this.props.recipe.recipe_note.id ?
            agent.Notes.updateNote(slug,id,note) : agent.Notes.addNote(slug, note)
            this.props.onSubmitForm(promise)
        }
    }

    componentWillMount() {
        if (this.props.recipe.recipe_note) {
            Object.assign(this.state, {
                body: this.props.recipe.recipe_note.body,

            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recipe.recipe_note) {
            this.setState(
                Object.assign({}, this.state, {
                    body: nextProps.recipe.recipe_note.body,
                })
            )
        }
    }


    render() {
        console.log('NoteForm this.props', this.props)

        return (
            <div>
                <Form onSubmit={this.submitForm}>
                    <Form.Group controlId="formGridDescription">
                        <Form.Control
                                as="textarea" 
                                rows="4"
                                placeholder="Enter Note"
                                value={this.state.body} 
                                onChange={this.updateState('body')}

                                />
                    </Form.Group>
                    <Button 
                        variant="dark"
                        type="submit"
                        disabled={this.props.inProgress}>
                        Update Note
                    </Button>
                </Form>
            </div>
        )
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(NoteForm)