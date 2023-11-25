import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import Card from "@mui/material/Card";
import { Check } from "@mui/icons-material";

const TodoCard = styled(Card)({
  padding: "1rem",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  color: "darkslategray",
  height: "calc(100% - 2rem)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 8px 8px #0002",
  "&:hover": {
    boxShadow: "0 2px 2px #0002",
  },
});

export const TodoItem = ({ task, setAsDone, setAsTodo, removeTask }) => (
  <TodoCard elevation={2} className="task" key={task.id}>
    <Typography
      className={task.done ? "done" : "task"}
      sx={{ marginBottom: "1rem" }}
    >
      {task.title}
    </Typography>
    <ButtonGroup variant="outlined">
      {!task.done ? (
        <Button
          startIcon={<Check />}
          variant="outlined"
          onClick={() => setAsDone(task.id)}
          size="small"
        >
          Terminé
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="warning"
          onClick={() => setAsTodo(task.id)}
          size="small"
        >
          Rouvrir
        </Button>
      )}
      <Button
        variant="outlined"
        color="error"
        onClick={() => removeTask(task.id)}
        size="small"
      >
        🗑️
      </Button>
    </ButtonGroup>
  </TodoCard>
);
