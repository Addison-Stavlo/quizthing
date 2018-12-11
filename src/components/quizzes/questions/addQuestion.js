import React from 'react';
import { StyledForm } from '../../styledcomps/styledcomps';
import axios from 'axios';

class AddQuestion extends React.Component{
    state = {
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: 1
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    addQuestion = (ev) => {
        ev.preventDefault();
        let myQuestion = {
            question: this.state.question,
            option1: this.state.option1,
            option2: this.state.option2,
            answer: this.state.answer
        }
        if(this.state.option3.length){
            myQuestion.option3 = this.state.option3;
        }
        if(this.state.option4.length){
            myQuestion.option4 = this.state.option3;
        }
        axios
            .post(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions`, myQuestion, {headers: {authorization: localStorage.getItem('userToken')}})
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }

    render() {
        return(
            <StyledForm onSubmit={this.addQuestion}>
                <input name='question' placeholder='question' value={this.state.question} onChange={this.handleChange}/>
                <input name='option1' placeholder='option1' value={this.state.option1} onChange={this.handleChange}/>
                <input name='option2' placeholder='option2' value={this.state.option2} onChange={this.handleChange}/>
                <input name='option3' placeholder='option3 (optional)' value={this.state.option3} onChange={this.handleChange}/>
                <input name='option4' placeholder='option4 (optional)' value={this.state.option4} onChange={this.handleChange}/>
                <select name='answer' onChange={this.handleChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
                <button type='submit'>Add Question</button>
            </StyledForm>
        )
    }
}

export default AddQuestion;