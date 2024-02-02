import React, { Component } from 'react'
import './Login.css'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import agent from '../../../agent'

import ListErrors from '../../Utilities/ListErrors/ListErrors'

const mapStateToProps = state => ({
    ...state.auth
})

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({
            type: 'UPDATE_FIELD_AUTH', key: 'email', value
        }),
    onChangePassword: value =>
        dispatch({
            type: 'UPDATE_FIELD_AUTH', key: 'password', value
        }),
    onSubmit: (email, password) => 
        dispatch({
            type: 'LOGIN', payload: agent.Auth.login(email, password)
        }),
    onUnload: () =>
        dispatch({
            type: 'LOGIN_PAGE_UNLOADED'
        }),
})

class Login extends Component {
    constructor() {
        super()
        this.changeEmail = event => this.props.onChangeEmail(event.target.value)
        this.changePassword = event => this.props.onChangePassword(event.target.value)
        this.submitForm = (email, password) => event => {
            event.preventDefault()
            this.props.onSubmit(email, password)
        }
    }

    componentWillUnmount() {
        this.props.onUnload()
    }

    render() {
        const { email, password } = this.props
        return (
            <div className="login"> 
                <Container>
                    <Row>
                        <Col className="login__header text-center">
                            <h3>Sign In</h3>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col>
                            <ListErrors errors={this.props.errors} />
                            <Form onSubmit={this.submitForm(email, password)}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control 
                                        type="email"
                                        placeholder="Enter email"
                                        value={email} 
                                        onChange={this.changeEmail}
                                        />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control 
                                        type="password"
                                        placeholder="Password"
                                        value={password} 
                                        onChange={this.changePassword}/>
                                </Form.Group>
                                <Button 
                                    variant="dark"
                                    type="submit"
                                    disabled={this.props.inProgress}>
                                    Submit
                                </Button>
                                </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="login__register text-center">
                            <Link className="login__link" to={`/register`}>
                                <span>Need an account? Sign up now</span>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)