import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { Loader } from "../components/UI/loader/Loader";

export const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPost, isLoading, postError] = useFetching(async function (id) {
    const response = await PostService.getPostById(id);
    setPost(response.data);
  });

  const [fetchComments, areLoading, commentsError] = useFetching(
    async function (id) {
      const response = await PostService.getPostCommentsById(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPost(id);
    fetchComments(id);
  }, []);

  return (
    <div>
      <h1>Пост {id}</h1>
      {postError ? (
        <p style={{ marginTop: "20px", color: "red" }}>
          Произошла ошибка: {postError}
        </p>
      ) : isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div>{post.title}</div>
      )}

      <hr style={{ margin: "10px 0" }} />

      {commentsError ? (
        <p style={{ marginTop: "20px", color: "red" }}>
          Произошла ошибка: {commentsError}
        </p>
      ) : areLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {comments.map((comment) => (
            <li key={comment.id}>
              <p style={{ marginBottom: 8, fontWeight: "bold" }}>
                {comment.name}
              </p>
              <p style={{ fontStyle: "italic" }}>{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
