import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "1rem",
};

export const TaskCreationModal = ({
  visible,
  setVisible,
  createTask,
  creationCallback = () => {},
}) => {
  const [title, setTitle] = useState("");

  const handleChange = (evt) => {
    setTitle(evt.target.value);
  };

  const create = async () => {
    try {
      // Create tasks
      const newTask = await createTask(title);
      // Reset field
      setTitle("");
      // Update list
      creationCallback(newTask);
      // close modal
      setVisible(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal
      open={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="modal-creation"
      aria-describedby="create a task"
    >
      <Paper style={styleModal}>
        <form noValidate noSubmit autoComplete="off">
          <TextField
            value={title}
            onChange={handleChange}
            fullWidth
            autoFocus
            name="title"
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                // Do code here
                ev.preventDefault();
              }
            }}
            sx={{ marginBottom: "1rem" }}
          />
          <Button submit={false} onClick={create}>
            Valider
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};
