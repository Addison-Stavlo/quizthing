import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import colors from '../colors/colors';

class Quizzes extends React.Component {
    state = {
        quizzes: [],
        myQuizzes: false
    }

    componentDidMount() {
        this.getQuizzes();
    }

    getQuizzes = () => {
        axios
        .get('https://lambda-study-app.herokuapp.com/api/quizzes')
        .then(res=> {
            console.log(res.data);
            this.setState({
                quizzes: res.data,
                myQuizzes: false
                })
            })
        .catch(err=>console.log(err))
    }

    myQuizzes = () => {
        if(!localStorage.getItem('userName')){
            alert('please log in to access your posted quizzes')
        }
        else{
            this.setState({
                quizzes: this.state.quizzes.filter(quiz => quiz.author === localStorage.getItem('userName')),
                myQuizzes: true
            })
        }
    }



    render() {
        return (
            <div>
                <button onClick={this.state.myQuizzes? this.getQuizzes:this.myQuizzes}>{this.state.myQuizzes? 'Get All Quizzes':'Get My Quizzes'}</button>
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
    border: 4px ridge lightgray;
    border-radius: 20px;
    padding: 0 50px 5px;
    cursor: pointer;
    box-shadow: 10px 10px 10px 0 lightgray;
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    justify-content: space-between;
    background: ${colors[3]};

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