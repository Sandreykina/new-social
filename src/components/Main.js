import React, {useState, useEffect} from "react";
import Post from "./Post";
import { initialProfile } from "../initialProfile";
import { useSelector } from 'react-redux'

const Main = ({ onAddPost, onPostClick, onProfileInfo }) => {
  const [posts, setPosts] = useState([]);
  const postsFromStore = useSelector((state) => state.posts.postsArr);

  useEffect(() => {
    setPosts(postsFromStore);
  }, [postsFromStore]);

  return (
    <div>
      <main className="content">
        <section className="profile">
          <div onClick={onProfileInfo} className="profile__wrapper">
            <img
              src={initialProfile.avatar}
              alt="Аватарка"
              className="profile__avatar"
            />
            <div className="profile__cover"></div>
          </div>
          <div className="profile__info">
            <div className="profile__info-twin">
              <h1 className="profile__title">{initialProfile?.nickname}</h1>
            </div>
            <p className="profile__subtitle">{initialProfile?.fio}</p>
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
