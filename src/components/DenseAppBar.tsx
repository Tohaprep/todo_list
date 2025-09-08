import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { red } from "@mui/material/colors";

export default function DenseAppBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="header" sx={{ flexGrow: 1 }}>
      <AppBar className="header_container" position="static">
        <Toolbar className="header_toolbar" variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            TodoList
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
