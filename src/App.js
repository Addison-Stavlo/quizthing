import React, { Component } from 'react';
import './App.css';
import Quizzes from './components/quizzes/quizzes';
import { Route, withRouter, NavLink } from 'react-router-dom';
import SingleQuiz from './components/quizzes/singleQuiz';
import Register from './components/authentication/register';
import Login from './components/authentication/login';
import CreateQuiz from './components/quizzes/createQuiz';
import NavBar from './components/navigation/navigation';

class App extends Component {
  state = {
    isLoggedIn: false
  }

  componentDidMount() {
    // if(localStorage.getItem('userToken')){
    //   this.props.history.push('/quizzes');
    // }
    // else {
    //   this.props.history.push('/login')
    // }
  }

  render() {
    return (
      <div className="App">
        <h1> Quiz things...</h1>
        <NavBar />
      
      <Route path='/quizzes' component={Quizzes}/>
      <Route path='/quiz/:id' component={SingleQuiz}/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login} />
      <Route path='/createQuiz' component={CreateQuiz}/>
      
      </div>
    );
  }
}

export default withRouter(App);
