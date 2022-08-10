import React from 'react'
import { Link } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Avatar, Toolbar, Typography, Divider, IconButton, Box } from '@mui/material';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';

const theme = createTheme({
    palette: {
        primary: {
            main: "#00000",
        },
        secondary: {
            main: '#00000',
        },
    },
});

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function HeaderbarAdmin() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <AppBar position="absolute" open={open} style={{ backgroundColor: "#F2C94C" }}>
                    <Toolbar sx={{ pr: '24px' }} >
                        <IconButton edge="start" color="secondary" aria-label="open drawer" onClick={toggleDrawer}
                            sx={{ marginRight: '36px', ...(open && { display: 'none' }), }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="black" noWrap sx={{ flexGrow: 1, ...(open && { display: 'none' }) }} >
                             Apel Music
                        </Typography>
                        {/* <IconButton color="inherit" style={{ paddingRight: '20px'}}>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography variant="body" color="black" align="center" noWrap style={{ paddingRight: "10px" }} >
                            Admin
                        </Typography>
                        <Avatar alt="Remy Sharp" src="" style={{ alignItems: "center" }} />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }} >
                        <Typography component="h1" variant="h6" color="primary" align="center" noWrap sx={{ flexGrow: 1 }} >
                            Apel Music
                        </Typography>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon color="primary" />
                        </IconButton>
                    </Toolbar>
                    {/* LIST ITEM MENU BAR */}
                    <List component="nav">
                        {/* {mainListItems} */}
                        <ListItemButton component={Link} to={'/'} >
                            <ListItemIcon>
                                <HomeIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Beranda" />
                        </ListItemButton>
                        <ListItemButton component={Link} to={'/admin/kelas'} >
                            <ListItemIcon >
                                <ListIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Manage Kelas" />
                        </ListItemButton>
                        <ListItemButton component={Link} to={'/admin/category'} >
                            <ListItemIcon>
                                <CategoryIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Manage Kategori" />
                        </ListItemButton>
                        <ListItemButton component={Link} to={'/admin/invoices'} >
                            <ListItemIcon>
                                <LocalShippingIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Manage Invoices" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton component={Link} to={'/'}>
                            <ListItemIcon>
                                <LogoutIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Log out" />
                        </ListItemButton>
                        {/* <Divider sx={{ my: 1 }} /> */}
                        {/* {secondaryListItems} */}
                    </List>
                </Drawer>
            </div>
        </ThemeProvider>
    )
}

export default HeaderbarAdmin
