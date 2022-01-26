import React, { useEffect, useState, useReducer } from "react";
import bgDesktopLight from "./Assets/bg-desktop-light.jpg";
import bgDesktopDark from "./Assets/bg-desktop-dark.jpg";
import Header from "./Components/Header";
import Input from "./Components/Input";
import Todolist from "./Components/TodoList";
import Footer from "./Components/Footer";
export const ThemeContext = React.createContext();
export const ActionsContext = React.createContext();

export const ACTIONS = {
  ADD_TODO: "add_todo",
  TOGGLE_COMPLETE: "toggle_complete",
  DELETE: "delete",
  UPDATE: "update",
  CLEAR_COMPLETED: "clear_completed",
};

export const DispatchContext = React.createContext();

function reducer(todos, action) {
  let prevTodos = todos ? [...todos] : [];
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [
        ...prevTodos,
        {
          id: new Date().getTime().toString(),
          text: action.payload.text,
          complete: false,
        },
      ];
    case ACTIONS.TOGGLE_COMPLETE:
      let index = prevTodos.findIndex((elem) => {
        return elem.id === action.payload.id;
      });
      prevTodos[index] = {
        ...prevTodos[index],
        complete: !prevTodos[index].complete,
      };
      return [...prevTodos];
    case ACTIONS.DELETE:
      prevTodos = prevTodos.filter((elem) => action.payload.id !== elem.id);
      return [...prevTodos];
    case ACTIONS.UPDATE:
      prevTodos = [...action.payload.list];
      return [...prevTodos];
    case ACTIONS.CLEAR_COMPLETED:
      prevTodos = prevTodos.filter((elem) => elem.complete !== true);
      return [...prevTodos];
    default:
      console.log("err");
      break;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [theme, setTheme] = useState(false);
  const [background, setBackground] = useState(bgDesktopLight);
  const [filter, setFilter] = useState("ALL");
  const [modify, setModify] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme") === "true" ? true : false);
    } else {
      localStorage.setItem("theme", "false");
    }
    if (localStorage.getItem("todos")) {
      try {
        let list = JSON.parse(localStorage.getItem("todos"));
        dispatch({
          type: ACTIONS.UPDATE,
          payload: { list: list },
        });
      } catch (err) {
        throw Error;
      }
    } else {
      localStorage.setItem("todos", "[]");
    }
  }, []);
  useEffect(() => {
    setBackground((background) => (theme ? bgDesktopDark : bgDesktopLight));
    localStorage.setItem("theme", theme.toString());
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("todos", todos ? JSON.stringify(todos) : "[]");
  }, [todos]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ActionsContext.Provider
        value={{ todos, dispatch, filter, setFilter, modify, setModify }}
      >
        <div className={`${theme ? "dark" : ""}`}>
          <div
            className="min-h-screen p-5 flex justify-center transition duration-500 bg-top bg-repeat-x dark:bg-gray-900"
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="flex flex-col lg:w-2/5 sm:w-4/5 w-full">
              <Header />
              <Input />
              <Todolist />
              <Footer />
              <p className="mx-auto mt-3 dark:text-gray-400 text-gray-600">
                Drag and drop to reorder list
              </p>
            </div>
          </div>
        </div>
      </ActionsContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
