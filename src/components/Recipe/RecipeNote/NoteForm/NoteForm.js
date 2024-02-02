import React, { Component } from 'react'


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button' 


class NoteForm extends Component {
    constructor() {
        super()

        this.state = {
            recipe_note: ''
        }

        this.updateState = field => ev => {
            const state = this.state
            const newState = Object.assign({}, state, {[field]: ev.target.value})
            this.setState(newState)
        }

        this.submitForm = ev => {
            ev.preventDefault()
            const note = Object.assign({}, this.state)
            this.props.onSubmitForm(note)
        }
    }

    componentWillMount() {
        if (this.props.recipe) {
            Object.assign(this.state, {
                recipe_note: this.props.recipe.recipe_note,
            })
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.recipe) {
    //         this.setState(
    //             Object.assign({}, this.state, {
    //                 recipe_note: nextProps.recipe.recipe_note,
    //             })
    //         )
    //     }
    // }


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
                                value={this.state.recipe_note} 
                                onChange={this.updateState('recipe_note')}
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

export default NoteForm