import React from 'react';
import axios from 'axios';
import styled from 'styled-components';


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
                <PostContainer key={post.id}>
                    <p className='date'>{Date(post.created_at)}</p>

                    <div className='post-title'>
                        <h1>{post.title}</h1>
                        <p>by {post.author}</p>
                    </div>

                    
                    <p>{post.body}</p>
                </PostContainer>
                ))}
            </div>
        )
    }
}

const PostContainer = styled.section`
    margin: 20px auto;
    width: 500px;
    border: 1px solid black;
    border-radius: 20px;
    padding: 0 50px 50px;
    box-shadow: 10px 10px 10px 0 lightgray;


    .post-title {
        display: flex;
        align-items: baseline;

        h1 {
            margin: 0;
        }
        p {
            margin: 0 0 0 20px;
        }
    }
    .date {
        font-size: 12px;
        margin: 0;
    }
`

export default Forum;