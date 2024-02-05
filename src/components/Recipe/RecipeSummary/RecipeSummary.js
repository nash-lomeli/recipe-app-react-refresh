import React from 'react'
import './RecipeSummary.css'

import { connect } from 'react-redux'
import agent from '../../../agent'

import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import IconButton from '@mui/material/IconButton';
import { LinkContainer } from 'react-router-bootstrap';
import { BlackTooltip } from '../../Utilities/tooltip'

const LIKED_CLASS = 'likeButtonIcon';
const NOT_LIKED_CLASS = 'unlikeButtonIcon';
const COOKED_CLASS = 'cookedButtonIcon';
const UNCOOKED_CLASS = 'uncookedButtonIcon';

const mapDispatchToProps = dispatch => ({
    like: slug => dispatch({
        type: 'RECIPE_PAGE_LIKE',
        payload: agent.Like.like(slug)
    }),
    cooked: slug => dispatch({
        type: 'RECIPE_PAGE_COOKED',
        payload: agent.Cooked.cooked(slug)
    }),
    showLikeList: slug => 
        dispatch({
            type: 'SHOW_MODAL',
            payload: {
                modalType: 'LIKE',
                modalProps: {
                    slug,
                    show: true,
                    title: 'Favorited'
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

const RecipeSummary = props => {

    const recipe = props.recipe
    const currentUser = props.currentUser

    const likeButtonClass = recipe.has_like ? LIKED_CLASS : NOT_LIKED_CLASS
    const cookedButtonClass = recipe.has_cooked ? COOKED_CLASS : UNCOOKED_CLASS

    const clickHandler = () => {
        props.like(recipe.slug)
    }

    const likeListHandler = () => {
        props.showLikeList(recipe.slug);
    }

    const cookedHandler = () => {
        props.cooked(recipe.slug)
    }

    const registerHandler = () => {
        props.showRegisterList();
    }

    return (
            <Container>
                <Row xs={1} sm={1} md={2} lg={2}>
                    <Col className="m-auto recipeSummary__left">
                        <Row className="recipeSummary__left__image">
                            <div>
                                {
                                recipe.RecipeImage[0].image && 
                                    <>
                                        <img className="recipeSummary__left__image_background" src={recipe.RecipeImage[0].image}/>
                                        <div style={{backgroundImage: `url(${recipe.RecipeImage[0].image})`, opacity: 1}} 
                                            className="recipeSummary__left__image_background"></div>
                                    </>
                                }
                            </div>
                            <div className="image_height"></div>
                            <div className="image_button">
                                <IconButton onClick={() => {currentUser ? clickHandler() : registerHandler()}}>
                                    <FavoriteBorderIcon className={likeButtonClass}/>
                                </IconButton>                           
                            </div>     
                        </Row>
                    </Col>
                    <Col className="m-auto recipeSummary__right">
                            <Row>
                                <Col className="recipeSummary__right__title">
                                    <h1>
                                        {recipe.title}
                                        <IconButton onClick={() => {currentUser ? cookedHandler() : registerHandler()}}>
                                                <BlackTooltip title="I Cooked It">
                                                    <BeenhereOutlinedIcon className={cookedButtonClass}/>
                                                </BlackTooltip>
                                        </IconButton>
                                    </h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="recipeSummary__right__subtitle">
                                <LinkContainer to={`/profiles/${recipe.author.username}/`}>
                                    <span className="recipeSummary__link">
                                        by {recipe.author.username}
                                    </span> 
                                </LinkContainer>
                                    <span>{recipe.cuisine && ' · ' + recipe.cuisine}</span>
                                </Col>
                            </Row>
                        <Row xs={8} sm={8} md={8} lg={8} className="recipeSummary__right__metrics">
                            <Col>
                                <Row>
                                    <Col className="recipeSummary__right__metricsValue">
                                        <span>{recipe.ingredient_count}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="recipeSummary__right__metricsText">
                                        <span>Ingredients</span>
                                    </Col>                                    
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col className="recipeSummary__right__metricsValue">
                                        <span>{recipe.total_time}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="recipeSummary__right__metricsText">
                                        <span>Minutes</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col className="recipeSummary__right__metricsValue">
                                        <span>{recipe.servings}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="recipeSummary__right__metricsText">
                                        <span>Servings</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col className="recipeSummary__right__metricsValue">
                                        <button onClick={likeListHandler}>
                                            {recipe.like_count}
                                        </button>
                                    </Col>                                    
                                </Row>
                                <Row>
                                    <Col className="recipeSummary__right__metricsText">
                                        <button onClick={likeListHandler}>
                                            Likes
                                        </button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
    )
}

export default connect(() => ({}), mapDispatchToProps)(RecipeSummary)
