import React from "react";

const Todoelement = ({ toggleComplete, complete, text, deleteHandler }) => {
  return (
    <div className="flex 2xl:text-lg bg-white dark:bg-gray-800 items-center w-full space-x-4 2xl:p-5 p-4 dark:text-gray-300 text-gray-800 border-b-[0.5px] dark:hover:bg-gray-700 hover:bg-gray-100 transition border-b-gray-200 dark:border-b-slate-700">
      <input
        type="checkbox"
        className="form-checkbox dark:bg-gray-600 rounded cursor-pointer bg-gray-200"
        checked={complete}
        onChange={toggleComplete}
      />
      <p className={`${complete ? "line-through opacity-75" : ""}`}>{text}</p>
      <div className="!ml-auto flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 cursor-pointer active:scale-105"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={deleteHandler}
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Todoelement;
