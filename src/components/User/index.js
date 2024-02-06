import React, { Component } from 'react'
import './index.css'
import agent from '../../agent'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ListErrors from '../Utilities/ListErrors/ListErrors'
import SettingsForm from './SettingsForm/SettingsForm'
import Button from 'react-bootstrap/Button'

const mapStateToProps = state => ({
    ...state.userSettings,
    currentUser: state.userSettings.currentUser,
})

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => 
        dispatch({
            type: 'LOGOUT'
        }),
    onSubmitForm: user =>  {
        const payload = agent.Auth.save(user)
        dispatch({
            type: 'SETTINGS_SAVED',
            payload
        })
    },
    onLoad: (payload) => {
        dispatch({
            type: 'SETTINGS_LOAD',
            payload
            })
    },
})

class UserSettings extends Component {
    componentWillMount() {
        this.props.onLoad(agent.Auth.current())
      }

    render() {


        console.log('this.props',this.props)
        return (
            <div className="userSettings">
                <Container>                
                    <Row>
                        <Col className="userSettings__header text-center">
                            <h3>Your Settings</h3>
                            <span>View or update your settings</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ListErrors errors={this.props.errors} />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" xs sm md lg = {2}>
                        <Col>
                            <SettingsForm
                                currentUser={this.props.currentUser}
                                onSubmitForm={this.props.onSubmitForm}
                                />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" xs sm md lg = {2}>
                        <Col className="userSettings__logoutButton">
                            <Button
                                variant="secondary"
                                type="submit"
                                onClick={this.props.onClickLogout}
                                >
                                Logout
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)