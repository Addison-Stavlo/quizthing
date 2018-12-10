import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

function NavBar() {

    return(
        <Nav>
            <NavLink exact to='/' >Home</NavLink>
            <NavLink to='/quizzes' >Quizzes</NavLink>
            <NavLink to='/createQuiz'>Create Quiz</NavLink>
            <NavLink to='/login'>Log In</NavLink>
            <NavLink to='/register'>Register</NavLink>
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