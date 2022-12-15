import { useNavigate, Outlet } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ToolsIcon from "@mui/icons-material/Construction";
import ContactsIcon from "@mui/icons-material/Group";
import IdBadgeIcon from "@mui/icons-material/Badge";
import { TitleLogo, FileInvoiceDollarIcon } from "@components";
import { PageContainer } from "../PageContainer";
import { NavDrawerBtn } from "./NavDrawerBtn";
import { AccountDrawerBtn } from "./AccountDrawerBtn";
import { ConnectDrawerBtn } from "./ConnectDrawerBtn";

// TODO Make the Drawer width(s) not based on VW, not good for narrower screens.

export const HomePageLayout = () => {
  const nav = useNavigate();

  return (
    <PageContainer style={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ "& .MuiDrawer-paper": { width: "14rem", minWidth: "14rem" } }}
        open
      >
        <div style={{ height: "100vh", overflowY: "clip" }}>
          <TitleLogo onClick={() => nav("/home")} styles={styles.headerLogoStyles} />
          <Divider />
          <List style={{ height: "94vh" }}>
            <NavDrawerBtn label="Dashboard" path="/home" icon={<DashboardIcon />} />
            <NavDrawerBtn label="Work Orders" path="/home/workorders" icon={<ToolsIcon />} />
            <NavDrawerBtn label="Invoices" path="/home/invoices" icon={<FileInvoiceDollarIcon />} />
            <NavDrawerBtn label="Contacts" path="/home/contacts" icon={<ContactsIcon />} />
            <div style={styles.drawerBottomBtnsContainer}>
              <Divider />
              <AccountDrawerBtn label="Account" />
              <NavDrawerBtn label="Profile" path="/home/profile" icon={<IdBadgeIcon />} />
              <ConnectDrawerBtn />
            </div>
          </List>
        </div>
      </Drawer>
      <div style={styles.contentAreaContainer}>
        <Outlet />
      </div>
    </PageContainer>
  );
};

const styles: Record<string, any> = {
  headerLogoStyles: {
    container: {
      height: "6vh",
      padding: "0 1.5rem",
      justifyContent: "flex-start"
    },
    logo: { width: "2.5rem", marginRight: "0.5rem" },
    title: { fontSize: "1.5rem" }
  },
  contentAreaContainer: {
    width: "calc(100vw - 14rem)",
    marginLeft: "auto",
    padding: "1rem 2rem",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden"
  },
  drawerBottomBtnsContainer: {
    height: "calc(94vh - 19rem)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  }
};
