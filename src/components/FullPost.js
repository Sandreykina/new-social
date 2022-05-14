
/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { useSelector, useDispatch } from 'react-redux'
import { addComment, changeLike } from "../slices/postsSlice";
import axios from 'axios';

const FullPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState();
    const [post, setPost] = useState();
    let newPostElement = React.useRef();
    const [comments, setComments] = useState();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
                setComments(res.data.comments);
                setIsLiked(res.data.isLiked);
        })
    }, [])

    const handleLikeClick = () => {
        axios.put(`http://localhost:5000/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
                setComments(res.data.comments);
                setIsLiked(res.data.isLiked);
        })
    }

    const handleAddComment = () => {
        // dispatch(addComment({
        //     postId: id, comment: {
        //         name: 'Me',
        //         comment: newPostElement.current.value,
        //     }
        // }));
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
                <input onKeyPress={handleEnterSend} ref={newPostElement} style={{ width: '80%' }}></input>
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
