import React from 'react';
import axios from 'axios';


class Forum extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('https://lambda-study-app.herokuapp.com/api/posts')
            .then(res=> console.log(res))
            .catch(err=>console.log(err))
    }

    render() {
        return(
            <div>
                {this.state.posts.map(post => <h1 key={post.id}>{post.title}</h1>)}
            </div>
        )
    }
}

export default Forum;