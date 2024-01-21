import React, { useState, useEffect } from "react";
import "../css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [originalTodos, setOriginalTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setOriginalTodos(storedTodos);
    setTodos(storedTodos);
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (todoText.trim() !== "") {
      const currentDate = new Date();
      const newTodo = {
        text: todoText,
        completed: false,
        date: currentDate.toLocaleString(),
      };

      if (editIndex === -1) {
        setOriginalTodos([...originalTodos, newTodo]);
        setTodos([...todos, newTodo]);
      } else {
        const newTodos = [...todos];
        newTodos[editIndex] = newTodo;
        setTodos(newTodos);
        setEditIndex(-1);
      }

      setTodoText("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setOriginalTodos(newTodos);
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    const todoToEdit = todos[index];
    setTodoText(todoToEdit.text);
    setEditIndex(index);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      const searchResults = originalTodos.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTodos(searchResults);
    }
  };

  const handleClearSearch = () => {
    setTodos(originalTodos);
    setSearchQuery("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-app">
      <h1>TodoApp</h1>
      <form className="input-section" onSubmit={handleAddTodo}>
        <input
          id="todoInput"
          type="text"
          placeholder="Add item..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button id="addBtn" type="submit" className="add">
          Add
        </button>
        <button
          type="button"
          className="add"
          id="update-button"
          style={{ display: editIndex !== -1 ? "inline" : "none" }}
          onClick={() => setEditIndex(-1)}
        >
          Update
        </button>
        <input
          type="text"
          id="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" id="search-button" onClick={handleSearch}>
          Search
        </button>
        <button type="button" onClick={handleClearSearch}>
          Clear Search
        </button>
      </form>
      <div className="todos">
        <ul className="todo-list">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <li key={index} className="li">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="option1"
                />
                <label
                  className="form-check-label"
                  htmlFor="inlineCheckbox1"
                ></label>
                <span className="todo-text">{todo.text}</span>
                <span className="todo-text">{todo.date}</span>
                <span
                  className="span-button"
                  onClick={() => handleDeleteTodo(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span
                  className="span-button"
                  onClick={() => handleEditTodo(index)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </span>
              </li>
            ))
          ) : (
            <div>
              <img
                className="face"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfWmM6kGRgEXV6gmz9T0P7x9-w8SwNw0fMIg&usqp=CAU"
                alt=""
              />
              <h1 className="not-found">NOT FOUND</h1>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
