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

    componentDidUpdate(prevProps) {
        if(this.props.grading && !prevProps.grading){
            this.props.submitAnswer(this.props.question,this.state);
        }
    }

    render() {
        return (
            <StyledQuestion>
                {this.props.toEdit? 
                    <AddQuestion edit question={this.props.question} match={this.props.match} getQuestions={this.props.getQuestions}/>
                    :
                    <form onChange={this.handleChange}>
                        <h3>{this.props.question.question}</h3>
                        {this.props.question.options.map((option,index) => (
                            <a key={index+1}>
                                <input type='radio' name='option' value={index+1} />{option}
                            </a>))}
                    </form>
                    }

            </StyledQuestion>
        )
    }
}

const StyledQuestion = styled.div`
    /* border: 1px solid black; */
    width: 100%;
    margin: 20px auto;
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