import React from 'react';
import axios from 'axios';
import { StyledForm } from '../styledcomps/styledcomps';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    logIn = (ev) => {
        ev.preventDefault();
        axios({
            method: "post",
            url: "https://lambda-study-app.herokuapp.com/api/auth/login",
            data: this.state})
            .then(res => {
                console.log(res);
                localStorage.setItem('userToken',res.data.token);
                localStorage.setItem('userName', res.data.user.username);
                localStorage.setItem('userID', res.data.user.id);
                this.props.logIn();
                this.props.history.push('/quizzes');
            })
            .catch(err=>console.log(err));
    } 

    render() {
        return(

            <StyledForm onSubmit={this.logIn}>
            <h1>Log In</h1>
                <input name='email' placeholder='email' onChange={this.handleChange} value={this.state.email} />
                <input name='password' placeholder='password' onChange={this.handleChange} value={this.state.password} />
                <button type='submit'>Log In</button>
            </StyledForm>
        )
    }
}

export default Login;