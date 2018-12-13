import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AddQuestion from './addQuestion';

// class Question extends React.Component {
    

// }

class Question extends React.Component {
    state = {
        option: 0
    }

    handleChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }  

    submitAnswer = (ev) => {
        ev.preventDefault();
        console.log(this.state)
        axios.get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions/${this.props.question.id}/response`,{params: this.state},{headers: {authorization: localStorage.getItem('userToken')}})
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }



    render() {
        return (
            <StyledQuestion>
                {this.props.toEdit? 
                    <AddQuestion edit question={this.props.question} match={this.props.match} getQuestions={this.props.getQuestions}/>
                    :
                    <form onChange={this.handleChange} onSubmit={this.submitAnswer}>
                        <h3>{this.props.question.question}</h3>
                        {this.props.question.options.map((option,index) => (
                            <a key={index+1}>
                                <input type='radio' name='option' value={index+1} />{option}
                            </a>))}
                        <button type='submit'>Submit Answer (testing console)</button>
                    </form>
                    }

            </StyledQuestion>
        )
    }
}

const StyledQuestion = styled.div`
    /* border: 1px solid black; */
    width: 80%;
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    h3 {
        text-align: left;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: 0 auto;

        a {
            text-align: left;
            padding-left: 20px;
        }
    }

`

export default Question;