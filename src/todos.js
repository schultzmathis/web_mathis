import { useTodos } from "./hooks";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";

import { TodoItem } from "./todoItem";
import { TaskCreationModal } from "./todoModal";
import { Add, FilterAlt } from "@mui/icons-material";

export const Todos = () => {
  const {
    loading,
    error,
    creationCallback,
    quickFilter,
    setQuickFilter,
    tasksToDisplay,
    setAsDone,
    setAsTodo,
    removeTask,
    createTask,
    visible,
    setVisible,
  } = useTodos();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        sx={{ marginBottom: "1rem" }}
      >
        <Button startIcon={<Add />} onClick={() => setVisible(true)}>
          Créer
        </Button>
        <TaskCreationModal
          visible={visible}
          setVisible={setVisible}
          createTask={createTask}
          creationCallback={creationCallback}
        />
        <Button
          startIcon={<FilterAlt />}
          onClick={() => setQuickFilter(!quickFilter)}
        >
          {quickFilter ? "Tout afficher" : "A faire"}
        </Button>
      </ButtonGroup>
      <Grid container spacing={1}>
        {tasksToDisplay.map((task) => (
          <Grid item key={task.id} xs={3}>
            <TodoItem
              task={task}
              setAsDone={setAsDone}
              setAsTodo={setAsTodo}
              removeTask={removeTask}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
