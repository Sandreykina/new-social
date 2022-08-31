import React, { useState, useEffect } from "react";
import Post from './Post';
import { useAppDispatch, useAppSelector } from '../hook';
import { getAllPosts } from '../slices/postsSlice';
import axios from 'axios';
import type { postType } from '../slices/postsSlice';

interface MainProps {
  onAddPost: () => void,
  onPostClick: (post: postType) => void,
  onProfileInfo: () => void,
}

const Main:  React.FC<MainProps> = ({ onAddPost, onPostClick, onProfileInfo }) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const [profile, setProfile] = useState();

  useEffect(() => {
    axios.get(`https://new-social-api.herokuapp.com/api/profile`)
      .then(res => {
        setProfile(res.data);
      })
  }, [])

  useEffect(() => {
    dispatch(getAllPosts({
      onFailure: () => {
        console.log('Не получилось получить посты');
      }, onSuccess: () => {
        console.log("Успешно");
      }
    }))
  }, [])

  return (
    <div>
      <main className="content">
        <section className="profile">
          <div onClick={onProfileInfo} className="profile__wrapper">
            <img
              src={profile?.['avatar']}
              alt="Аватарка"
              className="profile__avatar"
            />
            <div className="profile__cover"></div>
          </div>
          <div className="profile__info">
            <div className="profile__info-twin">
              <h1 className="profile__title">{profile?.['nickname']}</h1>
            </div>
            <p className="profile__subtitle">{profile?.['fio']}</p>
          </div>
          <button
            onClick={onAddPost}
            type="button"
            className="profile__add-button"
          ></button>
        </section>
        <section className="elements">
          {posts?.map((element, i) => {
            return (
              <Post
                post={element}
                key={i}
                onPostClick={onPostClick}
              />)
          })}
        </section>
      </main>
    </div>
  );
}

export default Main;
