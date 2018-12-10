import React from 'react';
import axios from 'axios';

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
                    <h2 onClick={()=>this.props.history.push(`/quiz/${quiz.id}`)}>{quiz.title}</h2>
                ))}
            </div>
        )
    }
}

export default Quizzes;