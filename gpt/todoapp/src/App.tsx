import React, { useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const TOGGLE_TODO_COMPLETION = gql`
  mutation ToggleTodoCompletion($id: ID!) {
    toggleTodoCompletion(id: $id) {
      id
      completed
    }
  }
`;

const App = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [toggleTodoCompletion] = useMutation(TOGGLE_TODO_COMPLETION);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddTodo = () => {
    if (todoTitle.trim()) {
      addTodo({
        variables: { title: todoTitle },
      });
      setTodoTitle("");
    }
  };

  const handleToggleTodoCompletion = (id: string) => {
    toggleTodoCompletion({ variables: { id } });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {data.todos.map(
          (todo: { id: string; title: string; completed: boolean }) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => handleToggleTodoCompletion}
              >
                {todo.title}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default App;
