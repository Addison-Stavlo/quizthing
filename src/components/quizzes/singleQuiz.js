import React from 'react';
import axios from 'axios';
import AddQuestion from './questions/addQuestion';
import Question from './questions/question';
import DeleteBox from '../alerts/deletebox';

class SingleQuiz extends React.Component {
    state = {
        quiz: {author: {}},
        isOwned: false,
        toEdit: false,
        showQuestions: false,
        questions: [],
        toDelete: false
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
            }).then(this.getQuestions())
            //     axios.get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions`)
            //     .then(res=>{
            //         console.log(res);
            //         this.setState({questions: res.data})
            //     })
            // )
    }

    getQuestions = () => {
        axios
        .get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions`)
        .then(res=>{
            console.log(res);
            this.setState({questions: res.data})
        })
        .catch(err=>console.log(err));
    }

    toggleDelete = () => {
        this.setState({
            toDelete: !this.state.toDelete
        })
    }

    deleteQuiz = () => {
        axios.delete(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}`,{headers: {authorization: localStorage.getItem('userToken')}})
            .then(res=>{
                console.log(res);
                this.props.history.push('/quizzes');
            })   
    }

    render(){
        return(
            <div>
                {this.state.toDelete? <DeleteBox delete={this.deleteQuiz} dontDelete={this.toggleDelete}/> : null}
                <h3>{this.state.quiz.title}</h3>
                <p>author: {this.state.quiz.author.username}</p>
                {this.state.isOwned? <button onClick={()=>this.setState({toEdit: !this.state.toEdit})}>Edit Quiz</button> : null}
                {this.state.toEdit? 
                    <>
                    <button onClick={()=>this.setState({toDelete: true})}>Delete Quiz</button>
                    <AddQuestion {...this.props} getQuestions={this.getQuestions}/>
                    </>
                    : <p>Questions...</p>}
                {this.state.questions.map(question=>(
                    <Question question={question} />))}
            </div>
        )
    }
}

export default SingleQuiz;