
/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import { setComment } from "../slices/postsSlice";
import { useDispatch, useSelector } from 'react-redux';

const FullPost = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLiked, setIsLiked] = useState();
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [comment, setComment] = useState();
    let newPostElement = React.useRef();
    const postsCount = useSelector((state) => state.posts.postsArr).length;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
                setComments(res.data.comments);
                setIsLiked(res.data.isLiked);
                setComment(res.data.comments[id]);
        })
    }, [])

    const handleLikeClick = () => {
        axios.put(`http://localhost:5000/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
                setComments(res.data.comments);
                setIsLiked(res.data.isLiked);
                setComment(res.data.comments[id]);
        })
    }

    // const handleAddComment = () => {
    //     axios.post(`http://localhost:5000/api/posts/${id}`)
    //         .then(res => {
    //             setPost(res.data);
    //             setComments(res.data.comments);
    //             setIsLiked(res.data.isLiked);
    //             setComment(res.data.comments[id]);
    //     })
    // }

    const handleAddComment = () => {
        dispatch(setComment({
            onFailure: () => {
              console.log('Не получилось добавить коммент');
            }, onSuccess: () => {
              console.log("Успешно");
            },
            data: {postId: id,
                comment: {
                    id: postsCount,
                    name: 'Me',
                    comment: newPostElement.current.value,
                }}
            }));
        newPostElement.current.value = '';
    }

    const handleEnterSend = (e) => {
        if (e.key === "Enter") {
            handleAddComment();
        }
    };

    return (
        <div className="content">
            <button onClick={() => navigate(-1)}>Go Back</button>
            <h1 > {post?.title} </h1>
            <img
                src={post?.img}
                className="element__image"
                alt={post?.description}
            />
            {post?.description}
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
                <input onKeyPress={handleEnterSend} ref={newPostElement}></input>
                <button onClick={handleAddComment} type="submit">Отправить</button>
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
