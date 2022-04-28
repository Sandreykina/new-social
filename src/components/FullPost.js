import React, { useState, useEffect } from "react";
import { useNavigate, useParams, } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { useSelector, useDispatch } from 'react-redux'
import { addComment, changeLike } from "../slices/postsSlice";

const FullPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isLiked, setisLiked] = useState(false);
    let newPostElement = React.createRef();
    const post = useSelector((state) => state.posts).postsArr.filter(item => item.id === Number(id)).pop();

    const [comments, setComments] = useState(post.comments);

    useEffect(() => {
        setComments(post.comments);
        setisLiked(post.isLiked);
    }, [post])

    const handleLikeClick = () => {
        dispatch(changeLike({ postId: id, like: !isLiked }));
    }

    const handleAddComment = () => {
        dispatch(addComment({
            postId: id, comment: {
                name: 'Me',
                comment: newPostElement.current.value,
            }
        }));
        newPostElement.current.value = '';
    }

    return (
        <div className="content">
            <button onClick={() => navigate(-1)}>Go Back</button>
            <h1 > {post.title} </h1>
            <img
                src={post.img}
                className="element__image"
                alt={post.description}
            />
            {post.description}
            <div className="fullpost__comment-likes">
                <FormControlLabel
                    onChange={handleLikeClick}
                    checked={isLiked}
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                    label='Like'
                />
                {isLiked ? post.likeCount + 1 : post.likeCount}
            </div>
            <div className="fullpost__comment-newcomment">
                <textarea ref={newPostElement} style={{ width: '80%' }}></textarea>
                <button onClick={handleAddComment}>Отправить</button>
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
