import React, { Component } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class SettingsForm extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            email: '',
            cuisine: '',
            description: '',
            street_address: '',
            city: '',
            state: '',
            postal_code: '',
            password: '',
        }

        this.updateState = field => ev => {
            const state = this.state
            const newState = Object.assign({}, state, { [field]: ev.target.value })
            this.setState(newState)
        }

        this.submitForm = ev => {
            ev.preventDefault()

            const user = Object.assign({}, this.state)
            console.log('this.submitForm - STEP_01', user)
            if (!user.password) {
                console.log('!user.password')
                delete user.password
                console.log('!user.password-user.password',user.password)
            }
            console.log('this.submitForm - STEP_02', user)
            this.props.onSubmitForm(user)
        }
    }

    componentWillMount() {
        if (this.props.currentUser) {
            Object.assign(this.state, {
                username: this.props.currentUser.username,
                email: this.props.currentUser.email,
                cuisine: this.props.currentUser.cuisine,
                description: this.props.currentUser.description,
                street_address: this.props.currentUser.street_address,
                city: this.props.currentUser.city,
                state: this.props.currentUser.state,
                postal_code: this.props.currentUser.postal_code,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser) {
            this.setState(
                Object.assign({}, this.state, {
                    username: nextProps.currentUser.username,
                    email: nextProps.currentUser.email,
                    cuisine: nextProps.currentUser.cuisine,
                    description: nextProps.currentUser.description,
                    street_address: nextProps.currentUser.street_address,
                    city: nextProps.currentUser.city,
                    state: nextProps.currentUser.state,
                    postal_code: nextProps.currentUser.postal_code,
                })
            )
        }
    }

    render() {

        let merchantInputs = null

        if (this.props.currentUser && this.props.currentUser.groups
            && this.props.currentUser.groups[0] && this.props.currentUser.groups[0].name=='Merchant') {
            merchantInputs = (
                <>
                    <Form.Group controlId="formGridCuisine">
                    <Form.Label>Cuisine</Form.Label>
                        <Form.Control
                                type="text"
                                placeholder="Enter cuisine"
                                value={this.state.cuisine} 
                                onChange={this.updateState('cuisine')}
                                />
                    </Form.Group>
                    
                    <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter street address"
                        value={this.state.street_address} 
                        onChange={this.updateState('street_address')}
                        />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="San Francisco"
                            value={this.state.city} 
                            onChange={this.updateState('city')}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter state"
                            value={this.state.state} 
                            onChange={this.updateState('state')}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter postal_code"
                                value={this.state.postal_code} 
                                onChange={this.updateState('postal_code')}
                                />
                        </Form.Group>
                    </Form.Row>
                </>
             )
        }

        return (
            <>
                <Row>
                    <Col>
                        <Form onSubmit={this.submitForm}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={this.state.username} 
                                        onChange={this.updateState('username')}
                                        />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="New Password"
                                        value={this.state.password} 
                                        onChange={this.updateState('password')}
                                        />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                                <Form.Control
                                        as="textarea" 
                                        rows="4"
                                        placeholder="Enter description"
                                        value={this.state.description} 
                                        onChange={this.updateState('description')}
                                        />
                            </Form.Group>
                            {merchantInputs}
                            <Button 
                                variant="primary"
                                type="submit"
                                disabled={this.props.inProgress}>
                                Update Settings
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </>
        )
    }
}

export default SettingsForm