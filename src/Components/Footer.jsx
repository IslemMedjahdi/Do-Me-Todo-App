import React, { useContext } from "react";
import { ACTIONS, ActionsContext } from "../App";

const Footer = () => {
  const { todos, dispatch, filter, setFilter } = useContext(ActionsContext);
  return (
    <footer className="z-10">
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        }}
        className="flex border-t-gray-200 dark:border-t-slate-700 transition py-2 px-5 justify-between bg-white dark:bg-gray-800 rounded-b items-center dark:text-gray-400 text-gray-500"
      >
        <div>
          <p>
            {todos &&
              todos.reduce(
                (total, curr) => (curr.complete ? total : total + 1),
                0
              )}{" "}
            {!todos && 0} items left
          </p>
        </div>
        <div className="hidden sm:flex space-x-7 sm:space-x-3 transition items-center font-semibold">
          <p
            onClick={() => setFilter("ALL")}
            className={`cursor-pointer ${
              filter === "ALL"
                ? "text-indigo-600 hover:text-indigo-400"
                : "hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            All
          </p>
          <p
            onClick={() => setFilter("ACTIVE")}
            className={`cursor-pointer ${
              filter === "ACTIVE"
                ? "text-indigo-600 hover:text-indigo-400"
                : "hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Active
          </p>
          <p
            onClick={() => setFilter("COMPLETED")}
            className={`cursor-pointer ${
              filter === "COMPLETED"
                ? "text-indigo-600 hover:text-indigo-400"
                : "hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Completed
          </p>
        </div>
        <p
          onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })}
          className="cursor-pointer hover:text-gray-900 dark:hover:text-white "
        >
          Clear Completed
        </p>
      </div>
      <div className="flex sm:hidden dark:text-gray-400 text-gray-500 rounded bg-white dark:bg-gray-800 mt-2 py-4 px-5 space-x-7 justify-center transition items-center font-semibold">
        <p
          onClick={() => setFilter("ALL")}
          className={`cursor-pointer ${
            filter === "ALL"
              ? "text-indigo-600 hover:text-indigo-400"
              : "hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          All
        </p>
        <p
          onClick={() => setFilter("ACTIVE")}
          className={`cursor-pointer ${
            filter === "ACTIVE"
              ? "text-indigo-600 hover:text-indigo-400"
              : "hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Active
        </p>
        <p
          onClick={() => setFilter("COMPLETED")}
          className={`cursor-pointer ${
            filter === "COMPLETED"
              ? "text-indigo-600 hover:text-indigo-400"
              : "hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Completed
        </p>
      </div>
    </footer>
  );
};

export default Footer;
