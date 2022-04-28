import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import { addPost } from "../slices/postsSlice";
import { useDispatch, useSelector } from 'react-redux'

const AddPostPopup = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const postsCount = useSelector((state) => state.posts.postsArr).length;

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  }

  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  const handleSave = () => {
    const newPost = {
      id: postsCount || 0,
      title: name,
      description: text,
      img: link,
      comments: [],
      likeCount: 0,
      isLiked: false,
    };

    dispatch(addPost({ post: newPost }));
  }

  useEffect(() => {
    setName("");
    setLink("");
    setText("");
  }, [isOpen]);

  return (
    <Popup
      name="addArticle"
      children={
        <div>
          <input
            required
            placeholder="Название"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            type="text"
            className="popup__input"
            minLength="2"
            maxLength="30"
          />
          <input
            required
            placeholder="Ссылка на картинку"
            name="link"
            id="link"
            value={link}
            onChange={handleLinkChange}
            type="url"
            className="popup__input"
          />
          {link.length > 1 && (<img
            alt=''
            src={link}
            className="element__image"
          />)}
          <div>
            <textarea
              style={{ overflow: 'auto', height: '100px' }}
              required
              placeholder="Текст"
              name="text"
              id="text"
              value={text}
              onChange={handleTextChange}
              type="text"
              className="popup__input"
              minLength="2"
              maxLength="1500"
            />
          </div>
        </div>
      }
      title="Новый пост"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSave}
    />
  );
}

export default AddPostPopup;
