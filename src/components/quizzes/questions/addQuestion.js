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
    componentDidMount() {
        if(this.props.edit){
            let newState = {
                question: this.props.question.question,
                option1: this.props.question.options[0],
                option2: this.props.question.options[1],
                answer: 0
            }
            if(this.props.question.options[2]){
                newState.option3 = this.props.question.options[2];
            }
            if(this.props.question.options[3]){
                newState.option4 = this.props.question.options[3];
            }
            this.setState(newState)
        }
    }
    
    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    stageQuestion = () => {
        let myQuestion = {
            question: this.state.question,
            option1: this.state.option1,
            option2: this.state.option2
        }
        if(this.state.option3.length){
            myQuestion.option3 = this.state.option3;
        }
        if(this.state.option4.length){
            myQuestion.option4 = this.state.option4;
        }
        if(this.state.answer){
            myQuestion.answer = this.state.answer;
        }
        return myQuestion;
    }

    addQuestion = (ev) => {
        ev.preventDefault();
        axios
            .post(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions`, this.stageQuestion(), {headers: {authorization: localStorage.getItem('userToken')}})
            .then(res=>{
                console.log(res);
                this.setState({        
                    question: '',
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: '',
                    answer: 1});
                this.props.getQuestions();
                })
            .catch(err=>console.log(err))
    }

    deleteQuestion = (ev) => {
        ev.preventDefault();
        axios.delete(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions/${this.props.question.id}`,{headers: {authorization: localStorage.getItem('userToken')}})
            .then(res=>{
                console.log(res);
                this.props.getQuestions();
            })
            .catch(err=>console.log(err));
    }

    editQuestion = (ev) => {
        ev.preventDefault();
        axios.patch(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions/${this.props.question.id}`,this.stageQuestion(),{headers: {authorization: localStorage.getItem('userToken')}})
            .then(res=>{
                console.log(res);
                alert('question updates successfully');
                this.props.getQuestions();
            })
            .catch(err=>console.log(err))
    }

    render() {
        return(
            <StyledForm onSubmit={this.props.edit? this.editQuestion : this.addQuestion}>
                <input name='question' placeholder='question' value={this.state.question} onChange={this.handleChange}/>
                <input name='option1' placeholder='option1' value={this.state.option1} onChange={this.handleChange}/>
                <input name='option2' placeholder='option2' value={this.state.option2} onChange={this.handleChange}/>
                <input name='option3' placeholder='option3 (optional)' value={this.state.option3} onChange={this.handleChange}/>
                <input name='option4' placeholder='option4 (optional)' value={this.state.option4} onChange={this.handleChange}/>
                <select name='answer' onChange={this.handleChange}>
                    {this.props.edit? <option value={0}>Change Answer</option>:null}
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
                <button type='submit'>{this.props.edit? 'Update Question' : 'Add Question'}</button>
                {this.props.edit? <button onClick={this.deleteQuestion}>Delete</button>:null}
            </StyledForm>
        )
    }
}

export default AddQuestion;