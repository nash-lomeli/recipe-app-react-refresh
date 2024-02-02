import React, { Component } from 'react'
import './Register.css'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import agent from '../../../agent'
import ListErrors from '../../Utilities/ListErrors/ListErrors'

const  mapStateToProps = state => ({
    ...state.auth
})

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value => 
        dispatch({ 
            type: 'UPDATE_FIELD_AUTH',
            key: 'email',
            value 
        }),
    onChangeUsername: value => 
        dispatch({ 
            type: 'UPDATE_FIELD_AUTH',
            key: 'username',
            value 
        }),
    onChangePassword: value =>
        dispatch({
            type: 'UPDATE_FIELD_AUTH',
            key: 'password',
            value
        }),
    onSubmit: (email, username, password) => {
        const payload = agent.Auth.register(email, username, password)
        dispatch({
            type: 'REGISTER',
            payload
        })
    },
    onUnload: () =>
        dispatch({
            type: 'REGISTER_PAGE_UNLOADED'
        }),
})

class Register extends Component {
    constructor() {
        super()
        this.changeEmail = event => this.props.onChangeEmail(event.target.value)
        this.changeUsername = event => this.props.onChangeUsername(event.target.value)
        this.changePassword = event => this.props.onChangePassword(event.target.value)
        this.submitForm = (email, username, password) => event => {
            event.preventDefault()
            this.props.onSubmit(email, username, password)
        }
    }

    componentWillUnmount() {
        this.props.onUnload()
    }

    render() {
        const { email, username, password } = this.props
        return (
            <div className="register"> 
                <Container>
                    <Row>
                        <Col className="register__header text-center">
                            <h3>Sign Up</h3>
                        </Col>
                    </Row>
                    
                    <Row className="justify-content-md-center">
                        <Col>
                            <ListErrors errors={this.props.errors} />
                            <Form onSubmit={this.submitForm(email, username, password)}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={this.changeEmail} 
                                        />
                                </Form.Group>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={this.changeUsername} 
                                        />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password" 
                                        value={password}
                                        onChange={this.changePassword}
                                        />
                                </Form.Group>
                                <Button
                                    variant="dark"
                                    type="submit"
                                    disabled={this.props.inProgress}
                                    >
                                    Submit
                                </Button>
                                </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="register__login text-center">
                            <Link className="register__link" to={`/login`}>
                                <span>
                                    Already a member? Log in
                                </span>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register) 