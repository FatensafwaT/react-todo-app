import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTodos } from "../contexts/todoConext";
import { useToast } from "../contexts/ToastContext";
export default function Todo({ todo, showUpdate, showDelete }) {
  const { todos, dispatch } = useTodos();
  const { showHideToast } = useToast();
  function handleCheckButton() {
    dispatch({ type: "TOGGLE_TODO", payload: todo });
    showHideToast(
      todo.isCompleted
        ? "Task completed successfully!"
        : "Task marked as not completed!"
    );
  }
  function handleDeleteButton() {
    showDelete(todo);
  }

  function handleUpdateButton() {
    showUpdate(todo);
  }

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          background: "#ffe9ef",
          marginTop: "5px",
        }}
        className="TodoCard"
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h4"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <IconButton
                onClick={() => handleCheckButton()}
                className="IconButton"
                style={{
                  color: "pink",
                  backgroundColor: todo.isCompleted ? "pink" : "white",
                  border: "solid 1px pink",
                }}
                aria-label="check"
              >
                <CheckIcon
                  style={{ color: todo.isCompleted ? "white" : "pink" }}
                />
              </IconButton>

              <IconButton
                onClick={() => handleDeleteButton()}
                className="IconButton"
                style={{
                  color: "pink",
                  backgroundColor: "white",
                  border: "solid 1px pink",
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={handleUpdateButton}
                className="IconButton"
                style={{
                  color: "pink",
                  backgroundColor: "white",
                  border: "solid 1px pink",
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
