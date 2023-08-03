import React from "react";
import { MyInput } from "./UI/input/MyInput";
import { MySelect } from "./UI/select/MySelect";

export const PostsFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <MyInput
        placeholder="Поиск..."
        value={filter.query}
        onChange={(event) =>
          setFilter({ ...filter, query: event.target.value })
        }
      />
      <MySelect
        defaultValue="Сортировка"
        options={[
          { value: "title", text: "По заголовку" },
          { value: "body", text: "По описанию" },
        ]}
        value={filter.sort}
        onChange={(selectedSort) => setFilter({ ...filter, sort: selectedSort })}
      />
    </div>
  );
};
