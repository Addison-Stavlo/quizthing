import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import colors from '../colors/colors';

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
    left: 0;
    background: ${colors[1]};
    
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 70px;
    font-size: 18px;
    border-bottom: 4px solid ${colors[2]};

    a {
        text-decoration: none;
        color: ${colors[2]};
        font-weight: bold;

        &:visited {
            color: ${colors[3]};
        }
        &.active {
            color: ${colors[2]};
            text-decoration: underline;
        }
    }

`

export default NavBar;