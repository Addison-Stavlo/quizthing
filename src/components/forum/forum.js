import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Post from './post';

class Forum extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('https://lambda-study-app.herokuapp.com/api/posts')
            .then(res=> {
                this.setState({posts: res.data})
                console.log(res.data)
            })
            .catch(err=>console.log(err))
    }

    render() {
        return(
            <div>
                {this.state.posts.map(post => (
                <Post key={post.id} post={post}/>))}
            </div>
        )
    }
}

export default Forum;