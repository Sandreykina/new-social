import React, {useEffect} from "react";
import Post from "./Post";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from "../slices/postsSlice";

const Main = ({ onAddPost, onPostClick, onProfileInfo }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.postsArr);
  const profileFromStore = useSelector((state) => state.profile.profileData);

  useEffect(() => {
    dispatch(getAllPosts({
      onFailure: () => {
        console.log('Не получилось получить посты');
      }, onSuccess: (res) => {
       console.log("Успешно");
      }
    }))
  }, []);

  return (
    <div>
      <main className="content">
        <section className="profile">
          <div onClick={onProfileInfo} className="profile__wrapper">
            <img
              src={profileFromStore.avatar}
              alt="Аватарка"
              className="profile__avatar"
            />
            <div className="profile__cover"></div>
          </div>
          <div className="profile__info">
            <div className="profile__info-twin">
              <h1 className="profile__title">{profileFromStore?.nickname}</h1>
            </div>
            <p className="profile__subtitle">{profileFromStore?.fio}</p>
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
