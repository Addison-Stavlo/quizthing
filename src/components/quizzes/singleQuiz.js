import React from 'react';
import axios from 'axios';
import AddQuestion from './questions/addQuestion';
import Question from './questions/question';
import DeleteBox from '../alerts/deletebox';
import CreateQuiz from './createQuiz';

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
    }
    sortQuestions = () => {
        this.setState({
            questions: this.state.questions.sort((q1,q2)=>{
                let numStr1 = '';
                let i1 = 0;
                while(!isNaN(q1.question[i1])){
                    numStr1 += q1.question[i1];
                    i1++;    
                }
                let numStr2 = '';
                let i2 = 0;
                while(!isNaN(q2.question[i2])){
                    numStr2 += q2.question[i2];
                    i2++;    
                }
                console.log(numStr1 + ' ? ' + numStr2)
                return Number(numStr1)-Number(numStr2);
            })
        })
    }

    getQuestions = () => {
        axios
        .get(`https://lambda-study-app.herokuapp.com/api/quizzes/${this.props.match.params.id}/questions`)
        .then(res=>{
            console.log(res);
            this.setState({questions: res.data})
        }).then(res=>{
            console.log('should be sorting...')
            this.sortQuestions()
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
                {this.state.toEdit? <CreateQuiz forEdit quiz={this.state.quiz}/> : 
                    <>
                        <h3>{this.state.quiz.title}</h3>
                        <p>author: {this.state.quiz.author.username}</p>
                    </>
                }
                {this.state.isOwned? <button onClick={()=>this.setState({toEdit: !this.state.toEdit})}>{this.state.toEdit? `Don't Edit` : `Edit Quiz`}</button> : null}
                {this.state.toEdit? 
                    <>
                    <button onClick={()=>this.setState({toDelete: true})}>Delete Quiz</button>
                    <AddQuestion {...this.props} getQuestions={this.getQuestions}/>
                    </>
                    : <p>Questions...</p>}
                {this.state.questions.map(question=>(
                    <Question toEdit={this.state.toEdit} question={question} match={this.props.match} getQuestions={this.getQuestions}/>))}
            </div>
        )
    }
}

export default SingleQuiz;