import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    state = {
        username: '',
        password: '',
        email: '',
        img_url: ''
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })

    }

    register = (ev) => {
        ev.preventDefault();
        axios({
            method: "post",
            url: "https://lambda-study-app.herokuapp.com/api/auth/register",
            data: this.state})
            .then(res => {
                console.log(res.data);
                localStorage.setItem('userToken',res.data.token);
                this.props.history.push('/quizzes')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <form onSubmit={this.register}>
                <h1>Registration:</h1>
                <input name='username' onChange={this.handleChange} placeholder='username' value={this.state.username}/>
                <input name='password' onChange={this.handleChange} placeholder='password' value={this.state.password} />
                <input name='email' onChange={this.handleChange} placeholder='email' value={this.state.email}/>
                <input name='img_url' onChange={this.handleChange} placeholder='image url' value={this.state.img_url} />   
                <button type='submit'>Register New User Info</button> 
             </form>
        )
    }
}

export default Register;