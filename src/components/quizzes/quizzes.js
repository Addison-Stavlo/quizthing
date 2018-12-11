import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

class Quizzes extends React.Component {
    state = {
        quizzes: []
    }

    componentDidMount() {
        axios
            .get('https://lambda-study-app.herokuapp.com/api/quizzes')
            .then(res=> {
                console.log(res.data);
                this.setState({quizzes: res.data})
                })
            .catch(err=>console.log(err))
    }


    render() {
        return (
            <div>
                {this.state.quizzes.map(quiz => (
                    <QuizContainer onClick={()=>this.props.history.push(`/quiz/${quiz.id}`)} key={quiz.id}>
                        <div className='quiz-title'>
                            <h2>{quiz.title}</h2>
                            <p>by {quiz.author}</p>
                        </div>
                        <h3>Topic: {quiz.topic}</h3>
                    
                    </QuizContainer>
                ))}
            </div>
        )
    }
}

const QuizContainer = styled.section`
    width: 500px;
    margin: 20px auto;
    border: 1px solid black;
    border-radius: 20px;
    padding: 0 50px 20px;
    cursor: pointer;
    box-shadow: 10px 10px 10px 0 lightgray;

    .quiz-title {
        display: flex;
        align-items: baseline;
        
        h2 {
            margin: 20px 0 0;
        }
        p {
            margin: 0 0 0 10px;
        }
        h3 {
            margin: 0;
        }
    }
`

export default Quizzes;