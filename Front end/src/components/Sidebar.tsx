import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CampaignIcon from "@mui/icons-material/Campaign";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import {
  styled,
  useTheme,
  type CSSObject,
  type Theme,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import userImage from "../assets/userImage.jpeg";
import { logout } from "../features/auth/authSlice";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }: { open: boolean }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }: { open: boolean }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

interface MiniDrawerProps {
  children: React.ReactNode;
}

const LINKS = [
  { text: "Dashboard", href: "/dashboard", icon: <HomeIcon /> },
  { text: "Schedule", href: "/schedule", icon: <CalendarMonthIcon /> },
  { text: "Courses", href: "/courses", icon: <BookIcon /> },
  { text: "Gradebook", href: "/gradebook", icon: <SchoolIcon /> },
  { text: "Performance", href: "/performance", icon: <QueryStatsIcon /> },
  { text: "Announcement", href: "/announcement", icon: <CampaignIcon /> },
];

const SIDEBAR_COLORS = {
  accent: "#60b8c3",
  accentLight: "#9ad9e0",
  accentSoft: "rgba(96, 184, 195, 0.22)",
  accentHover: "rgba(96, 184, 195, 0.14)",
  accentActiveHover: "rgba(96, 184, 195, 0.32)",
  textMuted: "rgba(255, 255, 255, 0.78)",
};

const getListItemStyles = (isActive: boolean) => ({
  display: "block",
  mx: 1.25,
  mb: 0.5,
  borderRadius: 2,
  overflow: "hidden",
  position: "relative" as const,
  color: isActive ? "#fff" : SIDEBAR_COLORS.textMuted,
  bgcolor: isActive ? SIDEBAR_COLORS.accentSoft : "transparent",
  boxShadow: isActive ? "0 4px 14px rgba(12, 99, 137, 0.25)" : "none",
  transition: "all 0.25s ease",
  "&::before": isActive
    ? {
        content: '""',
        position: "absolute",
        left: 0,
        top: "20%",
        height: "60%",
        width: 3,
        bgcolor: SIDEBAR_COLORS.accent,
        borderRadius: "0 4px 4px 0",
      }
    : {},
  "&:hover": {
    bgcolor: isActive
      ? SIDEBAR_COLORS.accentActiveHover
      : SIDEBAR_COLORS.accentHover,
    color: "#fff",
    "& .MuiListItemIcon-root": {
      color: SIDEBAR_COLORS.accentLight,
    },
  },
});

export default function Sidebar({ children }: MiniDrawerProps) {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(!isMdDown);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  React.useEffect(() => {
    setOpen(!isMdDown);
  }, [isMdDown]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isLinkActive = (href: string) => location.pathname === href;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            position: "relative",
            background:
              "linear-gradient(180deg, #0c6389 0%, #1a8aad 50%, #469cf2 100%)",
            color: "#fff",
            borderRight: "none",
            boxShadow: "4px 0 20px rgba(12, 99, 137, 0.2)",
          },
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            minHeight: { xs: 72, sm: 88 },
            px: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: 0.5,
              display: open ? "block" : "none",
              color: "#fff",
            }}
          >
            Coligo
          </Typography>
        </Toolbar>

        <List sx={{ px: 0.5, pt: 1 }}>
          {LINKS.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <Link
                key={link.text}
                to={link.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem disablePadding sx={getListItemStyles(isActive)}>
                  <ListItemButton
                    sx={[
                      {
                        minHeight: 48,
                        py: 1.5,
                        px: 2,
                      },
                      open
                        ? { justifyContent: "initial" }
                        : { justifyContent: "center" },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: "center",
                          color: isActive
                            ? SIDEBAR_COLORS.accentLight
                            : "rgba(255, 255, 255, 0.92)",
                          transition: "color 0.25s ease",
                        },
                        open ? { mr: 2.5 } : { mr: "auto" },
                      ]}
                    >
                      {React.cloneElement(link.icon, { sx: { fontSize: 26 } })}
                    </ListItemIcon>
                    <ListItemText
                      primary={link.text}
                      sx={{ opacity: open ? 1 : 0 }}
                      slotProps={{
                        primary: {
                          sx: {
                            fontWeight: isActive ? 700 : 600,
                            fontSize: "0.95rem",
                          },
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minWidth: 0,
          bgcolor: "#e6e6e6",
        }}
      >
        <MuiAppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "#fff",
            color: "text.primary",
            borderBottom: "1px solid #ececec",
          }}
        >
          <Toolbar
            sx={{
              minHeight: { xs: 72, sm: 88 },
              px: { xs: 2, md: 3 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                maxWidth: 1400,
              }}
            >
              <Typography
                sx={{
                  color: "#808885",
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", sm: "1.5rem" },
                }}
              >
                Welcome Mohamed,
              </Typography>

              <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
                <TextField
                  placeholder="Search"
                  variant="outlined"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "22px",
                      bgcolor: "#fafafa",
                      "& fieldset": {
                        borderColor: "#e6e6e6",
                        borderWidth: "2px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#d0d0d0",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1a8aad",
                      },
                    },
                  }}
                  size="small"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <SearchIcon color="action" sx={{ mr: 1 }} />
                      ),
                    },
                  }}
                />

                {!isMdDown ? (
                  <>
                    <Badge
                      badgeContent={4}
                      color="primary"
                      overlap="circular"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: 11,
                          fontWeight: 700,
                          boxShadow: "0 0 0 2px #fff",
                        },
                      }}
                    >
                      <NotificationsIcon
                        sx={{ color: "#1a8aad", fontSize: 32 }}
                      />
                    </Badge>

                    <Badge
                      badgeContent={4}
                      color="primary"
                      overlap="circular"
                      sx={{
                        "& .MuiBadge-badge": {
                          fontSize: 11,
                          fontWeight: 700,
                          boxShadow: "0 0 0 2px #fff",
                        },
                      }}
                    >
                      <EmailIcon sx={{ color: "#1a8aad", fontSize: 32 }} />
                    </Badge>

                    <Avatar
                      src={userImage}
                      alt="User profile"
                      sx={{ width: 40, height: 40 }}
                    />

                    <Button
                      variant="text"
                      sx={{
                        color: "error.main",
                        fontWeight: 700,
                        fontSize: "1rem",
                        textTransform: "none",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <IconButton
                      aria-controls={menuOpen ? "appbar-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={menuOpen ? "true" : undefined}
                      onClick={handleMenuOpen}
                      size="large"
                    >
                      <MenuIcon />
                    </IconButton>

                    <Menu
                      id="appbar-menu"
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                          <Badge badgeContent={4} color="primary">
                            <NotificationsIcon />
                          </Badge>
                        </ListItemIcon>
                        <ListItemText>Notifications</ListItemText>
                      </MenuItem>

                      <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                          <Badge badgeContent={4} color="primary">
                            <EmailIcon />
                          </Badge>
                        </ListItemIcon>
                        <ListItemText>Messages</ListItemText>
                      </MenuItem>

                      <Divider />

                      <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                          <Avatar
                            src={userImage}
                            sx={{ width: 32, height: 32 }}
                          />
                        </ListItemIcon>
                        <ListItemText>Mohamed</ListItemText>
                      </MenuItem>

                      <Divider />

                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          handleLogout();
                        }}
                      >
                        <ListItemText sx={{ color: "error.main", fontWeight: 700 }}>
                          Logout
                        </ListItemText>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Stack>
            </Stack>
          </Toolbar>
        </MuiAppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: "26px" },
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
