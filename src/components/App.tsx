import { useState, useEffect } from "react";
import * as React from 'react';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import AddPostPopup from './AddPostPopup';
import FullPost from './FullPost';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { PostsUrl } from '../utils/router';
import type { postType } from '../slices/postsSlice';

const App = () => {
  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState<boolean | (() => boolean)>(false);
  const navigate = useNavigate();
  const [loggedIn, setIsloggedIn] = useState<boolean | (() => boolean)>(false);

  useEffect(() => {
    if (!loggedIn) {
      navigate("./login");
    }
  }, [loggedIn, navigate])

  const handleAddPostClick = () => {
    setIsAddPostPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsAddPostPopupOpen(false);
  };

  const handleProfileClick = () => {
    navigate("./profile")
  };

  const handlePostClick = (post: postType) => {
    navigate(PostsUrl.pushPath({ id: post.id }));
  };

  const onEnter = (login: string, password: string) => {
    if (login !== '' && password !== '') {
      setIsloggedIn(true);
      navigate("/");
    }
  }

  return (
      <div className="page">
        <Header />
        <Routes>
          <Route path={PostsUrl.path} element={<FullPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login onSubmit={onEnter} />} />
          <Route path="/" element={
            <Main
              onAddPost={handleAddPostClick}
              onPostClick={handlePostClick}
              onProfileInfo={handleProfileClick}
            />} />
        </Routes>
        <AddPostPopup
          isOpen={isAddPostPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
  );
}

export default App;
