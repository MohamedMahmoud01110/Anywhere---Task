import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { Button, Divider, Stack, Typography } from "@mui/material";
import Task from "./Task";
const tasks = [
  {
    title: "Unit 2 Quiz",
    className: "Physics 02",
    topic: "Unit 2: Motion and Forces",
    date: "20 Dec 2017 - 09:00PM",
    buttonText: "Start Quiz",
    buttonHref: "/quiz/2",
    icon: HourglassBottomIcon,
  },
  {
    title: "Homework Assignment",
    className: "Math 101",
    topic: "Chapter 5: Algebra",
    date: "22 Dec 2017 - 11:59PM",
    buttonText: "View Assignment",
    buttonHref: "/assignment/5",
    icon: AssignmentIcon,
  },
];
export default function Tasks() {
  return (
    <Stack
      sx={{
        width: "100%",
        p: 1.5,
        bgcolor: "white",
        borderRadius: "8px",
      }}
    >
      <Stack sx={{ direction: "row", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#505050ff",
            letterSpacing: ".025rem",
          }}
        >
          What's due
        </Typography>
        <Button
          sx={{
            pt: 0,
            textTransform: "none",
            color: "#60b8c3ff",
            fontWeight: "bold",
          }}
        >
          All
        </Button>
      </Stack>
      <Typography color="#aaa">
        Lorem ipsum dolor sit amet, consectetur adip.
      </Typography>
      {tasks.map((task, index) => (
        <div key={index}>
          <Task {...task} />
          {index < tasks.length - 1 && <Divider sx={{ my: 2 }} />}
        </div>
      ))}
    </Stack>
  );
}
