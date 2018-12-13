import React from 'react';
import axios from 'axios';
import { StyledForm } from '../styledcomps/styledcomps';

class CreateQuiz extends React.Component {
    state = {
        title: '',
        topic: ''
    }

    componentDidMount() {
        if(this.props.forEdit){
            this.setState({
                title: this.props.quiz.title,
                topic: this.props.quiz.topic
            })
        }
    }

    handleChange = ev => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    addQuiz = (ev) => {
        ev.preventDefault();
        axios.post(`https://lambda-study-app.herokuapp.com/api/quizzes`, this.state, {headers: {authorization: localStorage.getItem('userToken')}})
          .then(res=>{
            console.log(res);
            this.props.history.push('quizzes');
        })
          .catch(err=>console.log(err))
    }

    updateQuiz = (ev) => {
        ev.preventDefault();
            axios.patch(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.quiz.id}/edit`,this.state, {headers: {authorization: localStorage.getItem('userToken')}})
                .then(res=>{
                    console.log(res);
                    alert('quiz info updated successfully');
                })
    }

    render() {
        return (
            <StyledForm onSubmit={this.props.forEdit? this.updateQuiz : this.addQuiz}>
            <h2>{this.props.forEdit? 'Update Quiz Info...' : 'Create New Quiz...'}</h2>
                Title:<input name='title' placeholder='title' onChange={this.handleChange} value={this.state.title} />
                Topic:<input name='topic' placeholder='topic' onChange={this.handleChange} value={this.state.topic} />
                <button type='submit'>{this.props.forEdit? 'Update Quiz': 'Add a Quiz'}</button>
            </StyledForm>
        )
    }
}

export default CreateQuiz;