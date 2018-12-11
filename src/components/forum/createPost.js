import React from 'react';
import axios from 'axios';
import { StyledForm } from '../styledcomps/styledcomps';

class CreatePost extends React.Component {
    state={
       title: '',
       body: '' 
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    createPost = (ev) => {
        ev.preventDefault();
        axios
            .post('https://lambda-study-app.herokuapp.com/api/posts', this.state, {headers: {authorization: localStorage.getItem('userToken')}})
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }

    render() {
        return(
            <StyledForm onSubmit={this.createPost}>
                <input name='title' placeholder='New Post Title' onChange={this.handleChange} value={this.state.title}/>
                <textarea name='body' placeholder='Write your new post...' onChange={this.handleChange} value={this.state.body} />
                <button type='submit'>Create Post</button>
            </StyledForm>
        )
    }
}

export default CreatePost;