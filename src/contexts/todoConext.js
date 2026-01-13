import { createContext,useReducer ,useContext} from "react";
import todosReducer from "../reducers/todosReducer";

export const TodoContext = createContext([]);
const TodosProvider=({children})=>{
  const [todos, dispatch] = useReducer(todosReducer, []);
  return(
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
export const useTodos=()=>{
  return useContext(TodoContext);
}
export default TodosProvider;
