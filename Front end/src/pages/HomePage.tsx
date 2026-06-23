import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import type { RootState } from "../store";

const FEATURES = [
  {
    icon: <SchoolOutlinedIcon sx={{ fontSize: 28, color: "#1a8aad" }} />,
    title: "Track your progress",
    description: "Monitor grades, assignments, and performance in one place.",
  },
  {
    icon: <BookOutlinedIcon sx={{ fontSize: 28, color: "#1a8aad" }} />,
    title: "Manage courses",
    description: "Access schedules, materials, and announcements easily.",
  },
  {
    icon: <InsightsOutlinedIcon sx={{ fontSize: 28, color: "#1a8aad" }} />,
    title: "Stay ahead",
    description: "Get insights and reminders so you never miss a deadline.",
  },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((s: RootState) => s.auth.loggedIn);

  const handleLogin = () => {
    dispatch(login());
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        background:
          "linear-gradient(135deg, #e3f2fd 0%, #f5f7fa 45%, #ffffff 100%)",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 12px 40px rgba(21, 101, 192, 0.12)",
          }}
        >
          <Stack spacing={4} sx={{ alignItems:"center", textAlign:"center"}}>
            <Stack  spacing={1.5} sx={{ alignItems: "center" }}>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  background:
                    "linear-gradient(180deg, #0c6389 0%, #1a8aad 50%, #469cf2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Coligo Learning Platform
              </Typography>

              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", sm: "2.75rem" },
                  background:
                    "linear-gradient(180deg, #0c6389 0%, #1a8aad 50%, #469cf2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Welcome to Coligo
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 520, lineHeight: 1.7 }}
              >
                Your learning journey starts here. Sign in to access your
                dashboard, courses, and academic insights.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%" }}
            >
              {FEATURES.map((feature) => (
                <Paper
                  key={feature.title}
                  variant="outlined"
                  sx={{
                    flex: 1,
                    p: 2.5,
                    borderRadius: 2,
                    textAlign: "left",
                    bgcolor: "#fafcff",
                    borderColor: "#e3f2fd",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 24px rgba(25, 118, 210, 0.12)",
                    },
                  }}
                >
                  <Stack spacing={1}>
                    {feature.icon}
                    <Typography sx={{ variant:"subtitle1", fontWeight:700}}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>

            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                px: 5,
                py: 1.25,
                textTransform: "none",
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: 2,
                background:
                  "linear-gradient(180deg, #0c6389 0%, #1a8aad 50%, #469cf2 100%)",
                boxShadow: "0 8px 20px rgba(26, 138, 173, 0.35)",
                "&:hover": {
                  background:
                    "linear-gradient(180deg, #0a5575 0%, #177c9c 50%, #3d8de0 100%)",
                  boxShadow: "0 10px 28px rgba(26, 138, 173, 0.45)",
                },
              }}
            >
              Login to Dashboard
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
