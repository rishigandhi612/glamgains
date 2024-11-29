import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Logopng } from "../../../assets";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../user/UserSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { selectCartItems } from "../../cart/CartSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TuneIcon from "@mui/icons-material/Tune";
import {
  selectProductIsFilterOpen,
  toggleFilters,
} from "../../products/ProductSlice";

export const Navbar = ({ isProductList = false }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Logic to clear user session (e.g., remove token from localStorage or call logout API)
    navigate("/logout");
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const settings = [
    { name: "Home", to: "/" },
    {
      name: "Profile",
      to: loggedInUser?.isAdmin ? "/admin/profile" : "/profile",
    },
    {
      name: loggedInUser?.isAdmin ? "Orders" : "My orders",
      to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders",
    },
    { name: "Logout", to: "/logout", onClick: handleLogout },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        boxShadow: "1px solid black",
        color: "text.primary",
      }}
    >
      <Toolbar
        sx={{
          p: 1,
          height: "5rem",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
          }}
        >
          <img src={Logopng} alt="Logo" style={{ maxWidth: "40%", height: "auto" }} />
        </Typography>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          columnGap={2}
        >
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {loggedInUser?.isAdmin && (
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  color={"text.primary"}
                  sx={{ textDecoration: "none" }}
                  to="/admin/add-product"
                  textAlign="center"
                >
                  Add new Product
                </Typography>
              </MenuItem>
            )}
            {settings.map((setting) => (
              <MenuItem key={setting.name} onClick={setting.onClick || handleCloseUserMenu}>
                <Typography
                  component={Link}
                  color={"text.primary"}
                  sx={{ textDecoration: "none" }}
                  to={setting.to}
                  textAlign="center"
                >
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="h6" fontWeight={300}>
            {userInfo?.name ? (is480 ? `${userInfo?.name.split(" ")[0]}` : `Hey👋, ${userInfo?.name}`) : "Hello!"}
          </Typography>
          {loggedInUser.isAdmin && <Button variant="contained">Admin</Button>}
          <Stack
            sx={{
              flexDirection: "row",
              columnGap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cartItems?.length > 0 && (
              <Badge badgeContent={cartItems.length} color="error">
                <IconButton
                  onClick={() => navigate("/cart")}
                  aria-label="Open Cart"
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            )}

            {!loggedInUser?.isAdmin && (
              <Badge badgeContent={wishlistItems?.length} color="error">
                <IconButton component={Link} to={"/wishlist"} aria-label="Open Wishlist">
                  <FavoriteBorderIcon />
                </IconButton>
              </Badge>
            )}
            {isProductList && (
              <IconButton onClick={handleToggleFilters} aria-label="Toggle Filters">
                <TuneIcon sx={{ color: isProductFilterOpen ? "black" : "" }} />
              </IconButton>
            )}
          </Stack>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userInfo?.name} src={userInfo?.avatar || "/default-avatar.png"} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
