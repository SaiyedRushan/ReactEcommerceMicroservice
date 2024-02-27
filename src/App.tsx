import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppBar, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", minHeight: "calc(100vh - 140px)" }}>
        <Outlet />
      </div>

      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            © {new Date().getFullYear()} Ecommerce store
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
