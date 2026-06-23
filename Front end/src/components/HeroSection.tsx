import { Box, Button, Stack, Typography } from "@mui/material";
import heroImage from "../assets/heroImage.png";

export default function HeroSection() {
  const textGradientStyle = {
    fontSize: "48px",
    fontWeight: "bold",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    background: "linear-gradient(to right, #0c6389ff, #469cf2ff, #60b8c3ff)",
    color: "transparent",
    backgroundClip: "text",
  };

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column-reverse", lg: "row" },
        justifyContent: "space-between",
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      {/* Left Side */}
      <Stack
        sx={{
          p: { xs: "16px 12px 0 12px", lg: "16px 0 0 16px" },
          width: { xs: "100%", lg: "45%" },
          alignItems: { xs: "center", lg: "flex-start" },
          textAlign: { xs: "center", lg: "left" },
        }}
      >
        <Typography sx={textGradientStyle} variant="h1">
          Exams time
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontWeight: 600,
            color: "#979595ff",
          }}
        >
          Here we are, Are you ready to fight? Don't worry. We prepared some
          tips to be ready for your exams.
        </Typography>

        <Typography
          sx={{
            my: 3,
            fontStyle: "italic",
            color: "#b1b1b1ff",
          }}
        >
          "Nothing happens until someone moves" -Albert Einstein
        </Typography>

        <Button
          variant="contained"
          sx={{
            px: "32px",
            py: "10px",
            borderRadius: "6px",
            width: "fit-content",
            fontWeight: "bold",
            boxShadow: "none",
            textTransform: "none",
            mb: { xs: 2, lg: 0 },
            bgcolor: "#60b8c3ff",
            "&:hover": {
              boxShadow: "none",
              bgcolor: "#4daab4",
            },
          }}
        >
          View exams tips
        </Button>
      </Stack>

      {/* Right Side */}
      <Box
        sx={{
          display: "flex",
          width: { xs: "100%", lg: "500px" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={heroImage}
          alt="hero image"
          style={{
            width: "100%",
            maxWidth: "500px",
          }}
        />
      </Box>
    </Stack>
  );
}
