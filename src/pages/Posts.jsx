import React, { useEffect, useRef, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { PostsFilter } from "../components/PostsFilter";
import { MyButton } from "../components/UI/button/MyButton";
import { MyModal } from "../components/UI/modal/MyModal";
import { PostForm } from "../components/PostForm";
import PostsList from "../components/PostsList";
import { Loader } from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { getPagesCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import { MySelect } from "../components/UI/select/MySelect";

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [toShowModal, setToShowModal] = useState(false);
  const lastElement = useRef();

  const [fetchPosts, arePostsLoading, postError] = useFetching(
    async function fetchPosts(limit, page) {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalPostsCount = +response.headers["x-total-count"];
      setTotalPages(getPagesCount(totalPostsCount, limit));
    }
  );

  const filteredAndSortedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  useObserver(lastElement, page < totalPages, arePostsLoading, () => {
    setPage(page + 1);
  });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setToShowModal(false);
  };

  const removePost = (postToRemove) => {
    setPosts(posts.filter((post) => post.id !== postToRemove.id));
  };

  return (
    <div>
      <MyButton
        style={{ marginTop: "20px" }}
        onClick={() => setToShowModal(true)}
      >
        Добавить пост
      </MyButton>
      <MyModal visible={toShowModal} setVisible={setToShowModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "10px 0" }} />
      <PostsFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(+value)}
        defaultValue="Количество постов"
        options={[
          { value: 5, text: "5" },
          { value: 10, text: "10" },
          { value: 25, text: "25" },
          { value: -1, text: "Показать всё" },
        ]}
      />

      <PostsList
        title={"Языки погромирования"}
        posts={filteredAndSortedPosts}
        remove={removePost}
      />

      {postError ? (
        <p style={{ marginTop: "20px", color: "red" }}>
          Произошла ошибка: {postError}
        </p>
      ) : (
        arePostsLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Loader />
          </div>
        )
      )}

      <div ref={lastElement} style={{ height: 50 }}></div>
    </div>
  );
}
