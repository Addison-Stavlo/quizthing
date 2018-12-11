import React from 'react';
import axios from 'axios';

class SingleQuiz extends React.Component {
    state = {
        quiz: {}
    }
    
    componentDidMount() {
        axios
            .get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}`)
            .then(res=>{
                this.setState({quiz: res.data})
                console.log(res)
            })
    }

    render(){
        return(
            <div>A Quiz: {this.state.quiz.title}</div>
        )
    }
}

export default SingleQuiz;