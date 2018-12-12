import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default class Post extends React.Component {
    state = {
        comments: [],
        comment: ''
    }

    componentDidMount() {
        this.getComments();
    }
    getComments = () => {
        axios.get(`https://lambda-study-app.herokuapp.com/api/posts/${this.props.post.id}/comments`)
        .then(res=>{
            console.log(res);
            this.setState({comments: res.data})
        })
        .catch(err=>console.log(err));
    }
    handleChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }
    addComment = (ev) => {
        ev.preventDefault();
        axios.post(`https://lambda-study-app.herokuapp.com/api/posts/${this.props.post.id}/comments`,{text: this.state.comment}, {headers: {authorization: localStorage.getItem('userToken')}})
            .then(res=>{
                console.log(res);
                this.getComments();
                this.setState({comment: ''})
            })
    }

    render(){
        return(
            <PostContainer>
                <p className='date'>{Date(this.props.post.created_at)}</p>

                <div className='post-title'>
                    <h1>{this.props.post.title}</h1>
                    <p>by {this.props.post.author}</p>
                </div>
                <p>{this.props.post.body}</p>

                <div className='comments-box'>
                {this.state.comments.map(comment=>(
                    <div className='comment-holder'>
                        <h4>{comment.author}</h4>
                        <p>{comment.text}</p>
                    </div>
                ))}
                <form onSubmit={this.addComment}>
                    <input name='comment' placeholder='new comment...' value={this.state.comment} onChange={this.handleChange}/>
                    <button type='submit'>Add Comment</button>
                </form>
                </div>
            </PostContainer>
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
    .comments-box {
        border: 1px solid red;
        .comment-holder {
            border: 1px solid blue;
            display: flex;
            align-items: baseline;

            p {
                margin-left: 10px;
            }
        }
    }

`