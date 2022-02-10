import * as React from "react";
import { styled } from "@mui/material/styles";
import '../dashboard/Dashboard.css'
// import Notes from "../notes/Notes";
import Profile from "../profile/Profile"
import { useHistory } from "react-router";

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

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import logo from '../../assets/images/logo.png';



import {
    Switch
} from 'react-router-dom';

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

const Dashboard = () => {

    const history = useHistory();
    const [open, setOpen] = React.useState(false);



    let iconlist = [
        {
            icons: <LightbulbOutlinedIcon />,
            icnText: "Notes"
        },
        {
            icons: <NotificationsOutlinedIcon />,
            icnText: "Reminder"
        },

        {
            icons: <EditOutlinedIcon />,
            icnText: "Edit Labels"
        },

        {
            icons: <ArchiveOutlinedIcon />,
            icnText: "Archive"
        },

        {
            icons: < DeleteOutlinedIcon />,
            icnText: "Bin"
        }
    ];

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const iconClick = (text) => {
        if (text.icnText === "Notes") {

            history.push("/")
        }
        else if (text.icnText === "Archive") {

            history.push("/archive")
        }
        else if (text.icnText === "Bin") {
            history.push("dashboard/trash")
        }
        else {
            console.log("page not found")
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
                        <MenuIcon className="menu" />
                    </IconButton>
                    <img src={logo} alt="logo" style={{ width: 30 }} />


                    <Typography className="name" variant="h6" noWrap component="div">
                        Fundoo
                    </Typography>
                    <div class="search-bar" >
                        {/* <SearchOutlinedIcon /> */}
                        <input type="search" className="input-search" placeholder="Search"></input>
                    </div>
                    <div className="nav-right-icon">


                        {/* <AccountCircleOutlinedIcon /> */}
                        <Profile />
                    </div>

                    {/* </div> */}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>

                </DrawerHeader>
                <List>
                    {iconlist.map((text, index) => (
                        <ListItem button key={text.icnText} onClick={() => iconClick(text)}>
                            <ListItemIcon>
                                {text.icons}
                            </ListItemIcon>
                            <ListItemText primary={text.icnText} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ zIndex: +1 }}>
                <DrawerHeader />
                <Typography paragraph>
                    <Switch>
                        {/* <Route path="/" exact component={Notes} />
                        <Route path="/archive"  component={Archive}/>
                        <Route path="/trash"  component={TrashNotes}/> */}
                    </Switch>

                </Typography>
                <Typography paragraph></Typography>
            </Box>
        </Box>
    );
}

export default Dashboard;