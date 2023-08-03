import React from "react";
import classes from "./Pagination.module.css";
import { MyButton } from "../button/MyButton";
import { usePagination } from "../../../hooks/usePagination";

export const Pagination = ({ totalPages, currentPage, changePage }) => {
  const pagesArray = usePagination(totalPages);

  return (
    <div className={classes.container}>
      {pagesArray.map((page) => (
        <MyButton
          key={page}
          className={page === currentPage ? classes.currentPage : ""}
          onClick={() => changePage(page)}
        >
          {page}
        </MyButton>
      ))}
    </div>
  );
};
