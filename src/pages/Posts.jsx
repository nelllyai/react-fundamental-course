import React, { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { PostsFilter } from "../components/PostsFilter";
import { MyButton } from "../components/UI/button/MyButton";
import { MyModal } from "../components/UI/modal/MyModal";
import { PostForm } from "../components/PostForm";
import PostsList from "../components/PostsList";
import { Pagination } from "../components/UI/pagination/Pagination";
import { Loader } from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { getPagesCount } from "../utils/pages";

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [toShowModal, setToShowModal] = useState(false);

  const [fetchPosts, arePostsLoading, postError] = useFetching(
    async function fetchPosts(limit, page) {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalPostsCount = +response.headers["x-total-count"];
      setTotalPages(getPagesCount(totalPostsCount, limit));
    }
  );

  const filteredAndSortedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
  };

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

      {postError ? (
        <p style={{ marginTop: "20px", color: "red" }}>
          Произошла ошибка: {postError}
        </p>
      ) : arePostsLoading ? (
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
        <>
          <PostsList
            title={"Языки погромирования"}
            posts={filteredAndSortedPosts}
            remove={removePost}
          />

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            changePage={changePage}
          />
        </>
      )}
    </div>
  );
}
