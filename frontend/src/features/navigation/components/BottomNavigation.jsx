import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useTheme,
  Badge,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../cart/CartSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";

export const MobileNavbar = () => {
  const [value, setValue] = React.useState(0); // To track the selected navigation option
  const [anchorEl, setAnchorEl] = React.useState(null); // State to control the settings menu
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);

  // Mobile Bottom Navigation Handler
  const handleNavigation = (index) => {
    setValue(index);
    switch (index) {
      case 0:
        navigate("/orders");
        break;
      case 1:
        navigate("/wishlist");
        break;
      default:
        break;
    }
  };

  // Open settings menu
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu
  };

  // Close settings menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Handle menu item click (Profile, Orders, Logout)
  const handleMenuItemClick = (route) => {
    navigate(route);
    handleCloseMenu(); // Close the menu after selection
  };

  // Don't render the mobile navbar on larger screens
  if (!isMobile) return null;

  return (
    <>
      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor: "white",
          boxShadow: 2,
          zIndex: 1000,
        }}
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
      >
        {/* Show Orders for non-admin users */}
        {!loggedInUser?.isAdmin && (
          <BottomNavigationAction
            label="Orders"
            icon={<ShoppingCartOutlinedIcon />}
            sx={{ color: "text.primary" }}
          />
        )}

        {/* Show Wishlist for non-admin users */}
        {!loggedInUser?.isAdmin && (
          <BottomNavigationAction
            label="Wishlist"
            icon={
              <Badge badgeContent={wishlistItems?.length} color="error">
                <FavoriteBorderIcon />
              </Badge>
            }
            sx={{ color: "text.primary" }}
          />
        )}

        {/* Show "Add New Product" and "Orders" for admin users */}
        {loggedInUser?.isAdmin && (
          <>
            {/* Add New Product button */}
            <BottomNavigationAction
              label="Add New Product"
              icon={<AddIcon />}
              sx={{ color: "text.primary" }}
              onClick={() => navigate("/admin/add-product")}
            />
            {/* Admin Orders button */}
            <BottomNavigationAction
              label="Orders"
              icon={<ShoppingCartOutlinedIcon />}
              sx={{ color: "text.primary" }}
              onClick={() => navigate("/admin/orders")}
            />
          </>
        )}

        {/* Settings button with Avatar */}
        <BottomNavigationAction
          label="Settings"
          icon={
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenMenu}>
                <Avatar alt={loggedInUser?.name} src={loggedInUser?.avatar || "/default-avatar.png"} />
              </IconButton>
            </Tooltip>
          }
          sx={{ color: "text.primary" }}
        />
      </BottomNavigation>

      {/* Settings Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {/* Home Menu Item */}
        <MenuItem onClick={() => handleMenuItemClick("/")}>
          <Typography>Home</Typography>
        </MenuItem>
        {/* Profile Menu Item */}
        <MenuItem onClick={() => handleMenuItemClick(loggedInUser?.isAdmin ? "/admin/profile" : "/profile")}>
          <Typography>Profile</Typography>
        </MenuItem>

        {/* Show Orders for admin */}
        {loggedInUser?.isAdmin && (
          <MenuItem onClick={() => handleMenuItemClick("/admin/orders")}>
            <Typography>Orders</Typography>
          </MenuItem>
        )}

        {/* Logout Menu Item */}
        <MenuItem onClick={() => handleMenuItemClick("/logout")}>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
