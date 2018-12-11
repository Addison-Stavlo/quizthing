import React, { Component } from 'react';
import './App.css';
import Quizzes from './components/quizzes/quizzes';
import { Route, withRouter } from 'react-router-dom';
import SingleQuiz from './components/quizzes/singleQuiz';
import Register from './components/authentication/register';
import Login from './components/authentication/login';
import CreateQuiz from './components/quizzes/createQuiz';
import NavBar from './components/navigation/navigation';
import Forum from './components/forum/forum';
import CreatePost from './components/forum/createPost';

class App extends Component {
  state = {
    isLoggedIn: false
  }

  componentDidMount() {
    if(localStorage.getItem('userToken')){
      this.setState({isLoggedIn: true})
    }
  }

  logOut = () => {
    localStorage.removeItem('userToken');
    this.setState({isLoggedIn: false});
  }
  logIn = () => {
    this.setState({isLoggedIn: true});
  }

  render() {
    return (
      <div className="App">
        <h1> Quiz things...</h1>
        <NavBar isLoggedIn={this.state.isLoggedIn} logOut={this.logOut}/>
      
      <Route path='/quizzes' component={Quizzes}/>
      <Route path='/quiz/:id' component={SingleQuiz}/>
      
      {this.state.isLoggedIn ? null : 
        <>
        <Route path='/register' render={(props)=><Register {...props} logIn={this.logIn}/>} />
        <Route path='/login' render={(props)=><Login {...props} logIn={this.logIn}/>} />
        </>
      }
      
      <Route path='/createQuiz' component={CreateQuiz}/>
      <Route path='/forum' component={Forum}/>
      <Route path='/createPost' component={CreatePost}/>
      
      </div>
    );
  }
}

export default withRouter(App);
