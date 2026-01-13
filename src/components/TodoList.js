import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useReducer, useMemo, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTodos } from "../contexts/todoConext";
import { useToast } from "../contexts/ToastContext";
export default function TodoList() {
  const { todos, dispatch } = useTodos();
  const { showHideToast } = useToast();
  const [titleInput, setTitleInput] = useState("");
  const [displatTodosType, setDisplayTodosType] = useState("all");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const completedTodos = todos.filter((t) => t.isCompleted);
  const notCompletedTodos = todos.filter((t) => !t.isCompleted);
  useEffect(() => {
    if (dialogTodo) {
      setUpdatedTodo({
        title: dialogTodo.title || "",
        details: dialogTodo.details || "",
      });
    }
  }, [dialogTodo]);

  const [UpdatedTodo, setUpdatedTodo] = useState({
    title: dialogTodo?.title,
    details: dialogTodo?.details,
  });
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }
  function handleDeleteConfirm() {
    dispatch({ type: "DELETE_TODO", payload: dialogTodo });
    setShowDeleteDialog(false);

    showHideToast("Task deleted successfully");
  }
  const allTodosItems = useMemo(() => {
    return todos.map((t) => (
      <Todo
        key={t.id}
        todo={t}
        showUpdate={openUpdateDialog}
        showDelete={openDeleteDialog}
      />
    ));
  }, [todos]);

  const completedTodosItems = useMemo(() => {
    return completedTodos.map((t) => (
      <Todo
        key={t.id}
        todo={t}
        showUpdate={openUpdateDialog}
        showDelete={openDeleteDialog}
      />
    ));
  }, [completedTodos]);

  const notCompletedTodosItems = useMemo(() => {
    return notCompletedTodos.map((t) => (
      <Todo
        key={t.id}
        todo={t}
        showUpdate={openUpdateDialog}
        showDelete={openDeleteDialog}
      />
    ));
  }, [notCompletedTodos]);

  let todoItemsTobeRendered;

  if (displatTodosType === "completed-todos") {
    todoItemsTobeRendered = completedTodosItems;
  } else if (displatTodosType === "not-completed-todos") {
    todoItemsTobeRendered = notCompletedTodosItems;
  } else {
    todoItemsTobeRendered = allTodosItems;
  }

  function handleAddingTask() {
    dispatch({ type: "ADD_TODO", payload: { title: titleInput } });
    setTitleInput("");
    showHideToast("Task added successfully");
  }
  useEffect(() => {
    dispatch({ type: "get_TODOS" });
  }, []);

  function changeDisplayType(e) {
    setDisplayTodosType(e.target.value);
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }
  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
    setDialogTodo(null);
  }
  function handleUpdateConfirm() {
    dispatch({
      type: "UPDATE_TODO",
      payload: {
        id: dialogTodo.id,
        title: UpdatedTodo.title,
        details: UpdatedTodo.details,
      },
    });
    setShowUpdateDialog(false);

    showHideToast("Task updated successfully");
  }

  return (
    <>
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this task?
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirm} autoFocus>
            yes{" "}
          </Button>
          <Button onClick={handleDeleteDialogClose}>No,Discard</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={handleUpdateDialogClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to Update this task?
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Task Title"
            type="text"
            fullWidth
            variant="standard"
            value={UpdatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...UpdatedTodo, title: e.target.value })
            }
          />

          <TextField
            required
            margin="dense"
            id="details"
            label="Task Details"
            type="text"
            fullWidth
            variant="standard"
            value={UpdatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...UpdatedTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateConfirm} autoFocus>
            Update{" "}
          </Button>
          <Button onClick={handleUpdateDialogClose}>Discard</Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="md">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography variant="h2">My Tasks</Typography>
            <Divider />
            <ToggleButtonGroup
              //value={alignment}
              // exclusive
              // onChange={handleAlignment}
              aria-label="text alignment"
              style={{ marginTop: "30px" }}
              value={displatTodosType}
              exclusive
              onChange={changeDisplayType}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="not-completed-todos">ToDo</ToggleButton>
              <ToggleButton value="completed-todos">Done</ToggleButton>
            </ToggleButtonGroup>
            {todoItemsTobeRendered}
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid
                size={8}
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="task title"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Grid>
              <Grid
                size={4}
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  variant="contained"
                  style={{ background: "pink", width: "100%", height: "100%" }}
                  onClick={handleAddingTask}
                  disabled={titleInput.trim() === ""}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
