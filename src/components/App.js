import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import AddPostPopup from "./AddPostPopup";
import FullPost from "./FullPost";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Profile from "./Profile";
import { PostsUrl } from "../utils/router";

const App = () => {
  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [loggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      navigate("./login");
    }
  }, [loggedIn, navigate])

  const handleAddPlaceClick = () => {
    setIsAddPostPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsAddPostPopupOpen(false);
  };

  const handleProfileClick = () => {
    navigate("./profile")
  };

  const handlePostClick = (post) => {
    navigate(PostsUrl.pushPath({ id: post.id }));
  };

  const onEnter = (login, password) => {
    if (login !== '' && password !== '') {
      setIsloggedIn(true);
      navigate("/");
    }
  }

  return (
    <div>
      <div className="page">
        <Header />
        <Routes>
          <Route exact path={PostsUrl.path} element={<FullPost />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login onSubmit={onEnter} />} />
          <Route path="/" element={
            <Main
              onAddPost={handleAddPlaceClick}
              onPostClick={handlePostClick}
              onProfileInfo={handleProfileClick}
            />} />
          <Route path="social-network" element={
            <Main
              onAddPost={handleAddPlaceClick}
              onPostClick={handlePostClick}
              onProfileInfo={handleProfileClick}
            />} />
        </Routes>
        <Footer />
        <AddPostPopup
          isOpen={isAddPostPopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleAddPlaceClick}
        />
      </div>
    </div>
  );
}

export default App;
