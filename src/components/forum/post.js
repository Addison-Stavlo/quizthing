import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import colors from '../colors/colors';

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
    deleteComment = (id) => {
        axios.delete(`https://lambda-study-app.herokuapp.com/api/posts/${this.props.post.id}/comments/${id}`,{headers: {authorization: localStorage.getItem('userToken')}})
            .then(res=>{
                console.log(res);
                this.getComments();
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
                <div className='post-body'>{this.props.post.body}</div>

                {this.state.comments.length? 
                    <div className='comments-box'>
                    <h3 className='comments-header'>Comments</h3>
                    {this.state.comments.map(comment=>(
                        <div className='comment-holder'>
                            <div className='comment-holder-content'>
                                <h4>{comment.author}</h4>
                                <p>{comment.text}</p>
                            </div>
                            {comment.author === localStorage.getItem('userName') ? 
                            <button className='delete-comment' onClick={()=>this.deleteComment(comment.id)}>Delete</button> : null}
                        </div>
                    ))}
                    </div>
                :null }

                <form onSubmit={this.addComment}>
                    <input name='comment' placeholder='new comment...' value={this.state.comment} onChange={this.handleChange}/>
                    <button type='submit'>Add Comment</button>
                </form>
            </PostContainer>
    )
}
}
const PostContainer = styled.section`
    margin: 20px auto;
    width: 500px;
    border: 4px ridge lightgray;
    border-radius: 20px;
    padding: 0 50px 30px;
    box-shadow: 10px 10px 10px 0 lightgray;
    background: ${colors[3]};

    .date {
        text-align: right;
        font-size: 12px;
        margin: 0;
    }

    .post-title {
        display: flex;
        align-items: baseline;
        padding-left: 10px;

        h1 {
            margin: 10px 0 0;
        }
        p {
            margin: 0 0 0 20px;
        }
    }
    .post-body {
        border: 3px ridge lightgray;
        padding: 20px 10px 10px;
        border-radius: 10px;
        margin-bottom: 20px;
        background: white;
    }
    .comments-box {
        border: 3px inset lightgray;
        padding: 5px;
        border-radius: 5px;
        background: white;

        .comments-header {
            margin: 0;
            border-bottom: 3px ridge lightgray;
        }

        .comment-holder {
            border-bottom: 1px inset lightgray;
            display: flex;
            align-items: baseline;
            justify-content: space-between;

            p {
                margin: 0 10px;
                display: inline-block;
            }
            h4 {
                margin: 10px 0 5px 5px;
                display: inline-block;
            }
        }
        .comment-holder:last-of-type {
            border-bottom: none;
        }
    }
    form {
        margin-top: 15px;
        width: 100%;

        box-sizing: border-box;
        display: flex;
        align-items: center;

            input {
                width: 75%;
                padding: 5px 10px;
                box-sizing: border-box;
                border: 3px inset lightgray;
                border-radius: 5px;
            }
            button {
                width: 25%;
                height: 25px;
            }
        }

`