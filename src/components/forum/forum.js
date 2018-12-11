import React from 'react';
import axios from 'axios';


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
                <>
                <h1 key={post.id}>{post.title}</h1>
                <p>{post.body}</p>
                </>
                ))}
            </div>
        )
    }
}

export default Forum;