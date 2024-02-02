import React from 'react'
import './RecipePreviewV2.css'

import { connect } from 'react-redux'
import agent from '../../../agent'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton';
import Image from 'react-bootstrap/Image'
const LIKED_CLASS = 'likeButtonIcon';
const NOT_LIKED_CLASS = 'unlikeButtonIcon';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser
})


const mapDispatchToProps = dispatch => ({
    profileLike: slug => dispatch({
        type: 'PROFILE_PAGE_LIKE_RECIPES',
        payload: agent.Like.like(slug)
    }),
    recipeLike: slug => dispatch({
        type: 'HOME_PAGE_LIKE_RECIPES',
        payload: agent.Like.like(slug)
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

const RecipePreviewV2 = (props) => {
    const recipe = props.recipe

    const likeButtonClass = recipe.has_like ? LIKED_CLASS : NOT_LIKED_CLASS;

    const profileClickHandler = () => {
        props.profileLike(recipe.slug);
    }

    const recipeClickHandler = () => {
        props.recipeLike(recipe.slug);
    }

    const likeListHandler = () => {
        props.showLikeList(recipe.slug);
    }

    const registerHandler = () => {
        props.showRegisterList();
    }

    const likeTypeHandler = (props) => {
        if (!props.currentUser) {
            return registerHandler()
        } else if (props.type == 'profile') {
            return profileClickHandler()
        } else {
            return recipeClickHandler()
        }
    }

    return (
            <div className="css-b7gm3f">
                <div className="css-pca8m">
                    <div className="css-1fu7xko ">
                        <div>
                        <Link style={{textDecoration: "none"}} to={`/recipes/${recipe.slug}/`}>
                            {
                            recipe.RecipeImage[0].image && 
                                <>
                                    <img className="css-fqc6yd" src={recipe.RecipeImage[0].image}/>
                                    {/* <div style={{backgroundImage: `url(${recipe.RecipeImage[0].image})`}} 
                                        className="css-fqc6yd"></div> */}
                                </>
                            }
                        </Link>       
                        </div>
                            <div className="css-1b02yrr"></div>
                            <div className="css-oxr0z6">
                                <IconButton  onClick={() =>  likeTypeHandler(props)}>
                                    <FavoriteBorderIcon className={likeButtonClass}/>
                                </IconButton>                           
                            </div>     
                    </div>
                    <div className="css-4h9p7m">
                    <Link style={{textDecoration: "none"}} to={`/recipes/${recipe.slug}/`}>
                        <h3 className="css-xmvqec">
                            <span className="css-1rr4qq7">{recipe.title}</span>
                            <div className="css-16fyabd">{recipe.total_time} Mins</div>
                        </h3>
                    </Link>
                    <Link style={{textDecoration: "none"}} to={`/profiles/${recipe.author.username}/`}>
                        <div>
                            <span className="css-kwzqkl">
                                <span className="css-1ms37uw">by {recipe.author.username}</span> 
                            </span>
                        </div>
                    </Link>
                        <div className="css-1xno3cu">
                            <span className="css-1lzl3v6" onClick={likeListHandler}>
                            <FavoriteBorderIcon fontSize="inherit" />
                                <span className="css-9dtuu6"></span>
                                {recipe.like_count} added to favorites
                            </span>
                        </div>
                    </div>
                </div>    
            </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePreviewV2)
