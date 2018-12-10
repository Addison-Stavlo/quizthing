import React from 'react';
import axios from 'axios';

class SingleQuiz extends React.Component {
    state = {
        quiz: {}
    }
    
    componentDidMount() {
        axios
            .get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}`)
            .then(res=>console.log(res))
    }

    render(){
        return(
            <div>A Quiz</div>
        )
    }
}

export default SingleQuiz;