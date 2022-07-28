
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';

const FullPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLiked, setIsLiked] = useState();
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [comment, setComment] = useState();
    let newPostElement = React.useRef();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
                setComments(res.data.comments);
                setIsLiked(res.data.isLiked);
        })
    }, [id]);

    const handleLikeClick = () => {
        axios.put(`http://localhost:5000/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
                setIsLiked(res.data.isLiked);
        })
    }

    const handleAddComment = () => {
        axios.post(`http://localhost:5000/api/posts/${id}`,  {
                id: comments?.length,
                name: 'Me',
                comment: comment,
        })
            .then(res => {
                setComments(res.data.comments);
        })
        setComment('');
        newPostElement.current.value = '';
    }

    const handleTextChange = (e) => {
        setComment(e.target.value);
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleAddComment();
        } 
    };

    return (
        <div className="content">
            <button className="fullpost-btn" onClick={() => navigate(-1)}>Назад</button>
            <h1 > {post?.title} </h1>
            <img
                src={post?.img}
                className="element__image"
                alt={post?.description}
            />
            <div className="fullpost__text">{post?.description}</div>
            
            <div className="fullpost__comment-likes">
                <FormControlLabel
                    onChange={handleLikeClick}
                    checked={isLiked}
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                    label='Like'
                />
                {post?.likeCount}
            </div>
            <div className="fullpost__comment-newcomment">
                <input onKeyPress={handleEnter} onChange={handleTextChange} ref={newPostElement}></input>
                <button className="fullpost-btn" onClick={handleAddComment} type="submit">Отправить</button>
            </div>
            {comments?.map((user, i) => (
                <div className="fullpost__comment" key={i}>
                    <div className="fullpost__comment-author">
                        {user.name} </div>
                    <div className="fullpost__comment-body">
                        {user.comment}</div></div>
            ))}
        </div>
    )
}

export default FullPost;
