import React from "react";
import classes from "./MySelect.module.css";

export const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      className={classes.mySelect}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="" disabled>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};
