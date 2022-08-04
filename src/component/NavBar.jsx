import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppleIcon from "@mui/icons-material/Apple";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Outlet, NavLink } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
	{ title: <ShoppingCartIcon />, path: "cart" },
	{ title: "Kelasku", path: "class" },
	{ title: "Pembelian", path: "buy" },
	{ title: "Daftar Sekarang", path: "register" },
	{ title: "Masuk", path: "login" },
];

function DrawerAppBar(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				{/* mobile window */}
				<AppleIcon sx={{ color: "black" }} />
				Music
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<NavLink key={item.title} to={item.path} style={{ textDecoration: "none", color: "black" }}>
						<ListItem disablePadding>
							<ListItemButton sx={{ textAlign: "center" }}>
								<ListItemText primary={item.title} />
							</ListItemButton>
						</ListItem>
					</NavLink>
				))}
			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex", width: "80vw" }}>
			<AppBar component="nav" sx={{ backgroundColor: "#F2C94C" }}>
				<Toolbar>
					<Grid container>
						<Grid item xs={2} sx={{ textAlign: "left" }}>
							<IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
								<MenuIcon sx={{ color: "black" }} />
							</IconButton>
							<NavLink key="home" to="/" style={{ textDecoration: "none" }}>
								<Typography sx={{ flexGrow: 1, display: { xs: "none", sm: "block", color: "black" } }}>
									<AppleIcon sx={{ color: "black" }} />
									Music
								</Typography>
							</NavLink>
						</Grid>
						<Grid item xs={10} sx={{ textAlign: "right" }}>
							<Box sx={{ display: { xs: "none", sm: "block" } }}>
								<NavLink to="cart" style={{ textDecoration: "none" }}>
									<Button key="cart" sx={{ color: "black", textTransform: "Capitalize" }}>
										<ShoppingCartIcon />
									</Button>
								</NavLink>
								<NavLink to="class" style={{ textDecoration: "none" }}>
									<Button key="class" sx={{ color: "black", textTransform: "Capitalize" }}>
										Kelasku
									</Button>
								</NavLink>
								<NavLink to="buy" style={{ textDecoration: "none" }}>
									<Button key="buy" sx={{ color: "black", textTransform: "Capitalize" }}>
										Pembelian
									</Button>
								</NavLink>
								<NavLink to="register" style={{ textDecoration: "none" }}>
									<Button key="register" sx={{ color: "black", textTransform: "Capitalize" }}>
										Daftar Sekarang
									</Button>
								</NavLink>
								<NavLink to="login" style={{ textDecoration: "none" }}>
									<Button variant="contained" style={{ right: "0px", textTransform: "Capitalize" }}>
										Masuk
									</Button>
								</NavLink>
							</Box>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { sm: "block", md: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}>
					{drawer}
				</Drawer>
			</Box>
			<Toolbar />
			<Box>
				<Outlet />
			</Box>
		</Box>
	);
}

DrawerAppBar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default DrawerAppBar;
