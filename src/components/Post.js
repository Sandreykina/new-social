import React from "react";

const Post = ({ post, onPostClick, onPostLike, onPostDelete, }) => {
  const handlePostClick = () => {
    onPostClick(post);
  }

  return (
    <div>
      <article className="element">

        <img
          src={post.img}
          alt={post.title}
          onClick={handlePostClick}
          className="element__image"
        />

        <div className="element__info">
          <h2 className="element__title">{post.title}</h2>
          <div className="element__container">
          </div>
        </div>

        <div style={{ height: "100px" }}>
          {post.description.length > 130 ? post.description.slice(0, 130) + '...' : post.description}
        </div>
      </article>
    </div>
  );
}

export default Post;
