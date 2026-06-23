import { Avatar, Box, Stack, Typography } from "@mui/material";

type MessageProps = {
  name: string;
  className: string;
  desc: string;
  img: string;
};

export default function Message({ name, className, desc, img }: MessageProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1.5, sm: 3 }}
      sx={{ alignItems: { xs: "flex-start", sm: "flex-start" } }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
          flexShrink: 0,
          width: { xs: "100%", sm: 200, md: 220 },
        }}
      >
        <Avatar
          src={img}
          alt={name}
          sx={{ width: 52, height: 52, flexShrink: 0 }}
        />
        <Stack spacing={0.25} sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.9rem",
              color: "#505050",
              lineHeight: 1.3,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "#aeaeae",
              lineHeight: 1.3,
            }}
          >
            {className}
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "#979797",
            lineHeight: 1.65,
            pt:2
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Stack>
  );
}
