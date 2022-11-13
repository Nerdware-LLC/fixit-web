import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import MailIcon from "@mui/icons-material/Mail"; // FIXME change icons
import { PageContainer, AppBar } from "../components";

const DRAWER_WIDTH = 240;

const HomePagesLayout = () => {
  return (
    <PageContainer>
      <Box sx={{ display: "flex" }}>
        <AppBar />
        <Box
          component="nav"
          sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <HomePagesDrawer />
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}
        >
          <Outlet />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default HomePagesLayout;

const HomePagesDrawer = () => (
  <Drawer
    variant="permanent"
    sx={{
      display: { xs: "none", sm: "block" },
      "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH }
    }}
    open
  >
    <div>
      <Toolbar />
      <Divider />
      <List>
        {Object.entries(DRAWER_BTNS).map(([label, { Icon }]) => (
          <ListItem key={`HomePagesDrawer:ListItem:${label.replace(/\s/g, "_")}`} disablePadding>
            <ListItemButton>
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  </Drawer>
);

const DRAWER_BTNS = {
  "Work Orders": {
    Icon: <MailIcon /> // FIXME
  },
  Invoices: {
    Icon: <MailIcon /> // FIXME
  },
  Contacts: {
    Icon: <MailIcon /> // FIXME
  }
};
