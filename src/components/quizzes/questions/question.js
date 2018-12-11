import React from 'react';
import styled from 'styled-components';

// class Question extends React.Component {
    

// }

class Question extends React.Component {
    state = {
        answer: 0
    }

    handleChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }  

    render() {
        return (
            <StyledQuestion>
        
                <form onChange={this.handleChange}>
                    <h3>{this.props.question.question}</h3>
                    {this.props.question.options.map((option,index) => (
                        <a key={option}>
                            <input type='radio' name='answer' value={index+1} />{option}
                        </a>))}
                </form>
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