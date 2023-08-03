import React from "react";
import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PostsList = ({ title, posts, remove }) => {
  if (!posts.length) {
    return (
      <p
        style={{
          marginTop: "10px",
          fontWeight: "bold",
          fontSize: "18px",
          fontStyle: "italic",
          color: "crimson",
        }}
      >
        Список постов пуст
      </p>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem
              post={post}
              remove={remove}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PostsList;
