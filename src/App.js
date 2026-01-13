import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ToastProvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/todoConext";
const theme = createTheme({
  typography: {
    fontFamily: ["'Pacifico'"],
  },
});
const initialtodos = [
  {
    id: uuidv4(),
    title: "First Task",
    details: "First Task details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Second Task",
    details: "Second Task details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Third Task",
    details: "Third Task details",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialtodos);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              background: "#ffe9ef",
              direction: "ltr",
            }}
          >
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
