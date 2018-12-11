import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

function NavBar(props) {

    return(
        <Nav>


            <div>
                <NavLink to='/quizzes' >Quizzes </NavLink>|
                <NavLink to='/createQuiz'> Create Quiz</NavLink>
            </div>



            <div>
                <NavLink to='/forum'>Forum </NavLink>|
                <NavLink to='/createPost'> New Discussion</NavLink>
            </div>

            {props.isLoggedIn ? 
                <NavLink exact to='/' onClick={props.logOut} >Log Out</NavLink>
            : 
                <div>
                    <NavLink to='/login'>Log In </NavLink>|
                    <NavLink to='/register'> Register</NavLink>
                </div>
            }


        </Nav>
    )
}

const Nav = styled.nav`
    width: 100%;
    position: fixed;
    top: 0;
    background: teal;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 70px;
    font-size: 18px;
    border-bottom: 3px solid aqua;

    a {
        text-decoration: none;
        color: black;
        font-weight: bold;

        &:visited {
            color: black;
        }
        &.active {
            color: white;
        }
    }

`

export default NavBar;