import React from 'react';
import axios from 'axios';
import AddQuestion from './questions/addQuestion';
import Question from './questions/question';

class SingleQuiz extends React.Component {
    state = {
        quiz: {author: {}},
        isOwned: false,
        toEdit: false,
        showQuestions: false,
        questions: []
    }
    
    componentDidMount() {
        axios
            .get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}`)
            .then(res=>{
                this.setState({quiz: res.data})
                console.log(res)
                if(res.data.author.username === localStorage.getItem('userName')){
                    this.setState({isOwned: true})
                }
            }).then(
                axios.get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions`)
                .then(res=>{
                    console.log(res);
                    this.setState({questions: res.data})
                })
            )
    }

    getQuestions = () => {
        axios
        .get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions`)
        .then(res=>{
            console.log(res);
            this.setState({questions: res.data})
        })
    }

    render(){
        return(
            <div>
                <h3>{this.state.quiz.title}</h3>
                <p>author: {this.state.quiz.author.username}</p>
                {this.state.isOwned? <button onClick={()=>this.setState({toEdit: !this.state.toEdit})}>Edit Quiz</button> : null}
                {this.state.toEdit? <AddQuestion {...this.props}/>: <p>Questions...</p>}
                {this.state.questions.map(question=>(
                    <Question question={question} />))}
            </div>
        )
    }
}

export default SingleQuiz;