import React, { useState } from "react";
import AddInput from "../AddInput/AddInput";
import Header from "../Header/Header";
import TodoList from "../TodoList/TodoList";
import "./Todo.css";
import Counter from "../Counter/Counter";
import List from "../List/List";

function Todo() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="todo">
      <Header title="Todo" />
      <Counter initialCount={0} />
      <List initialItems={["Caíque", "Mariana", "Ícaro"]} />
      <AddInput setTodos={setTodos} todos={todos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default Todo;
