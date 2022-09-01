
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import type { postType, commentType } from '../slices/postsSlice';

const FullPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLiked, setIsLiked] = useState<boolean>();
    const [post, setPost] = useState<postType>();
    const [comments, setComments] = useState<commentType[]>();
    const [comment, setComment] = useState<commentType["comment"]>();
    //let newPostElement = React.useRef<HTMLInputElement>(null);
    let newPostElement = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        axios.get(`https://new-social-api.herokuapp.com/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
                setComments(res.data.comments);
                setIsLiked(res.data.isLiked);
            })
    }, [id]);

    const handleLikeClick = () => {
        axios.put(`https://new-social-api.herokuapp.com/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
                setIsLiked(res.data.isLiked);
            })
    }

    const handleAddComment = () => {
        debugger
        axios.post(`https://new-social-api.herokuapp.com/api/posts/${id}`, {
            id: comments?.length,
            name: 'Me',
            comment: comment,
        }).then(res => {
            if(!!res.data){
                setComments(res.data.comments);
            }
        })
        setComment('');
        if (!!newPostElement.current) {
            newPostElement.current.value = '';
        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }

    const handleEnter = (e: React.KeyboardEvent) => {
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
