import "./App.css";
import { Todos } from "./todos";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

function App() {
  return (
    <div className="app">
      <AppBar position="static" className="app-bar">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            TODO
          </Typography>
        </Toolbar>
      </AppBar>
      <main className="content">
        <Todos />
      </main>
    </div>
  );
}

export default App;
