import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currenTodos, action) {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currenTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify([...currenTodos, newTodo]));
      return updatedTodos;
    }

    case "UPDATE_TODO": {
      const updatedTodos = currenTodos.map((t) =>
        t.id === action.payload.id
          ? {
              ...t,
              title: action.payload.title,
              details: action.payload.details,
            }
          : t
      );

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "DELETE_TODO": {
      const updatedTodos = currenTodos.filter(
        (t) => t.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get_TODOS": {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
    case "TOGGLE_TODO": {
      const updatedTodos = currenTodos.map((t) => {
      if (t.id === action.payload.id) {
        const updatedTodo = { ...t, isCompleted: !t.isCompleted };
        return updatedTodo;
      }
      else { return t;
      }
      
    });
     localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return updatedTodos;
   
    ;}

    default: {
      throw Error("Unknown action type: " + action.type);
    }
  }
}
