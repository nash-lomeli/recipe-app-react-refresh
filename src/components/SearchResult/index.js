import React, { Component } from 'react'
import './index.css'

import { connect } from 'react-redux'

import ResultsList from './ResultsList/ResultsList'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const mapStateToProps = state => ({
    results: state.common.results,
    query: state.common.query
})

class SearchResult extends Component {

    
    render() {

        return (
            <div className="searchResult">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs={12} sm={12} md={8} lg={8} className="searchResult__header">
                                <span>{this.props.query}</span>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={12} md={8} lg={8}>
                            <ResultsList
                                recipes={this.props.results}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default connect(mapStateToProps, ()=>({}))(SearchResult)