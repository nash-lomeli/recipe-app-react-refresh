import React, { Component } from 'react'
import './Header.css'

import {Navbar, Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {

    constructor() {
        super()

        this.state = {
            query: '',
        }

        this.updateState = field => ev => {
            const state = this.state
            const newState = Object.assign({}, state, { [field]: ev.target.value })
            this.setState(newState)
        }

        this.submitForm = ev => {
            ev.preventDefault()
            const search = Object.assign({}, this.state)
            this.props.onSubmitForm(search.query)
        }
    }
    

    render() {
        const UserHeader = props => {
            if (!props.currentUser) {
                return (
                    <div className="_2j1Lb">
                            <Nav>
                                 <LinkContainer to="/login">
                                     <Nav.Link className="DUsc3">Login</Nav.Link>
                                 </LinkContainer>
                                 <LinkContainer to="/register">
                                     <Nav.Link className="DUsc3">Sign Up</Nav.Link>
                                 </LinkContainer>
                             </Nav>
                    </div>
                )
            } else {
                return (
                    <div className="_2j1Lb">
                        <Nav>
                            <LinkContainer to={`/profiles/${props.currentUser.username}/feed`}>
                                    <Nav.Link className="DUsc3">Following</Nav.Link>
                                </LinkContainer>
                            <LinkContainer to="/settings">
                                <Nav.Link className="DUsc3">{props.currentUser.username}</Nav.Link>
                            </LinkContainer>
                         </Nav>
                    </div>
            )
            }
        }
        
        return (
            <Navbar expand="sm" data-toggle="collapse" className="header _2xMJp" sticky="top">
                    <Nav className="_1sUFB _1CBrG _2-V32">
                        <LinkContainer to="/">
                            <Nav.Link className="logo">🍋</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <div className="_1g2pj">
                        <form className="_2jvJJ mV0BM" onSubmit={this.submitForm}>
                            <button className="_2VoZY _3d86A" type="submit">
                                <svg width="32" height="32" className="_2-tlh _1azRR _1mPD6" version="1.1" viewBox="0 0 32 32" aria-hidden="false">
                                    <path d="M31 28.64l-7.57-7.57a12.53 12.53 0 1 0-2.36 2.36l7.57 7.57zm-17.5-6a9.17 9.17 0 1 1 6.5-2.64 9.11 9.11 0 0 1-6.5 2.67z"></path>
                                </svg>
                            </button>
                            <div className="_2ZbDJ">
                                    <input type="text" 
                                                className="_3q0cO _3FYu1" 
                                                placeholder="Search recipes" 
                                                value={this.state.query}
                                                onChange={this.updateState('query')}/>
                            </div>
                        </form>
                    </div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse  id="responsive-navbar-nav">
                        <UserHeader
                            currentUser={this.props.currentUser}/>
                    </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header