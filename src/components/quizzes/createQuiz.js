import React from 'react';
import axios from 'axios';
import { StyledForm } from '../styledcomps/styledcomps';

class CreateQuiz extends React.Component {
    state = {
        title: '',
        topic: ''
    }

    handleChange = ev => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    addQuiz = (ev) => {
        ev.preventDefault();
        axios.post(`https://lambda-study-app.herokuapp.com/api/quizzes`, this.state, {authentication: localStorage.getItem('userToken')})
          .then(res=>{
            console.log(res);
            // this.props.history.push('quizzes')
        })
          .catch(err=>console.log(err))
    }

    render() {
        return (
            <StyledForm onSubmit={this.addQuiz}>
                <input name='title' placeholder='title' onChange={this.handleChange} value={this.state.title} />
                <input name='topic' placeholder='topic' onChange={this.handleChange} value={this.state.topic} />
                <button type='submit'>Add a Quiz</button>
            </StyledForm>
        )
    }
}

export default CreateQuiz;