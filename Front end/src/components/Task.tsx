import type { SvgIconTypeMap } from "@mui/material";
import { Button, Stack, Typography } from "@mui/material";
import type { OverridableComponent } from "@mui/types";
type TaskProps = {
  title: string;
  className: string;
  topic: string;
  date: string;
  buttonText: string;
  buttonHref: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};

export default function Task({
  title,
  className,
  topic,
  date,
  buttonText,
  buttonHref,
  icon: Icon,
}: TaskProps) {
  return (
    <Stack sx={{ my: 4 }}>
      {/* Title & Icon */}
      <Stack sx={{ direction: "row", alignItems: "center", gap: 1 }}>
        <Icon sx={{ color: "#60b8c3ff", fontSize: "32px" }} />
        <Typography>{title}</Typography>
      </Stack>

      {/* Class */}
      <Stack sx={{ direction: "row", gap: 1, mt: 1 }}>
        <Typography color="#afaeaedd">Course:</Typography>
        <Typography color="#afaeaedd">{className}</Typography>
      </Stack>

      {/* Topic */}
      <Stack sx={{ direction: "row", gap: 1, my: 1 }}>
        <Typography color="#afaeaedd">Topic:</Typography>
        <Typography color="#afaeaedd">{topic}</Typography>
      </Stack>

      {/* Date */}
      <Stack sx={{ direction: "row", gap: 1 }}>
        <Typography color="#afaeaedd">Due to:</Typography>
        <Typography color="#afaeaedd">{date}</Typography>
      </Stack>

      {/* Button */}
      <Button
        variant="outlined"
        href={buttonHref}
        sx={{
          mt: 2,
          textTransform: "none",
          color: "#60b8c3ff",
          fontWeight: "bold",
          fontSize: "18px",
          borderColor: "#60b8c3ff",
          borderWidth: "2px",
          borderRadius: "6px",
        }}
      >
        {buttonText}
      </Button>
    </Stack>
  );
}
