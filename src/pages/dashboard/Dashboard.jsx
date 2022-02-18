import * as React from "react";
import { styled } from "@mui/material/styles";
import '../dashboard/Dashboard.css'
// import Notes from "../notes/Notes";
import Profile from "../profile/Profile"
// import { useHistory } from "react-router";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import logo from '../../assets/images/logo.png';
import TrashNote from '../../components/trashNote/TrashNote';
import Notes from "../notes/Notes";
import { Link } from "react-router-dom";
import Tippy from '@tippyjs/react';
import { Route } from "@mui/icons-material";

import {
    Switch
} from 'react-router-dom';
import DisplayLabel from "../../components/displayLabel/DisplayLabel";

const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "white",
  boxShadow: "0px",
  border: "1px solid lightgray",
  color: "black",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  // width: drawerWidth,
  flexShrink: 10,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

const Dashboard = ({history}) => {
  const [openLabel, setOpenLabel] = React.useState(false);
  // const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleLabel = () => {
    setOpenLabel(true);
  }

  const getColor=(curr) => {
  if(history.location.pathname===curr) {
    return "#f8b45a";
  }

  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar class="heaadbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <div className="menu" >
              <Tippy content="Main Menu">
                <MenuIcon />
              </Tippy>
            </div>

          </IconButton>

          <img src={logo} alt="logo" style={{ width: 30 }} />

          <Typography className="name" variant="h6" component="div">
            Fundoo
          </Typography>
          <div class="search-bar" >
            <Tippy content="Search">
              <SearchOutlinedIcon className="search" />
            </Tippy>
            <input className="input-search" type="text" placeholder="Search"></input>
          </div>
          <div className="nav-right-icon">
            <Profile />
          </div>

          {/* </div> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>

        </DrawerHeader>
        <List>
          {/* {iconlist.map((text, index) => ( */}
            <ListItem button style={{ background: getColor('/dashboard/note'), borderTopRightRadius: '20px', borderBottomRightRadius: '20px'}}>
              <Link to='/dashboard/note' style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                <ListItemIcon style={{ alignItems: 'center' }}>
                  <LightbulbOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Notes" />
              </Link>
            </ListItem>
            <ListItem button style={{ background: getColor('/dashboard/reminder'), borderTopRightRadius: '20px', borderBottomRightRadius: '20px'}}>
            <Link to='/dashboard/reminder' style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                <ListItemIcon style={{ alignItems: 'center' }}>
                  <NotificationsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Reminder" />
              </Link>
            </ListItem>
            <ListItem button onClick={handleLabel}>
            {/* <Link to='/dashboard/label' style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}> */}
                <ListItemIcon style={{ alignItems: 'center' }} >
                  <EditOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Label" />
              {/* </Link> */}
            </ListItem>
            <ListItem button>
            <Link to='/dashboard/archive' style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                <ListItemIcon style={{ alignItems: 'center' }}>
                  <ArchiveOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Reminder" />
              </Link>
            </ListItem>
            <ListItem button style={{ background: getColor('/dashboard/trash'), borderTopRightRadius: '20px', borderBottomRightRadius: '20px'}}>
            <Link to='/dashboard/trash' style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                <ListItemIcon style={{ alignItems: 'center' }}>
                  < DeleteOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Bin" />
              </Link>
            </ListItem>

          {/* ))} */}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ zIndex: +1 }}>
        <DrawerHeader />
        <Typography paragraph>
          <Switch>
                <Route path="/dashboard/note" component={Notes} />
                <Route path="/dashboard/trash" component={TrashNote } />
              </Switch>
            <DisplayLabel openLabel={openLabel} setOpenLabel={setOpenLabel}/>
          
        </Typography>
        <Typography paragraph></Typography>
      </Box>
    </Box>
  );
}

export default Dashboard;