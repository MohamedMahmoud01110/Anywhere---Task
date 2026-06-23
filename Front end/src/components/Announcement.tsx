import { Button, Paper, Stack, Typography, Skeleton } from "@mui/material";
import userImage from "../assets/userImage.jpeg";
import Message from "./Message";
import { useEffect, useState } from "react";
import { getAnnouncements } from "../api/AnnouncementApi";
const messages = [
  {
    name: "Mr. Ahmed Mostafa",
    className: "Math 101",
    desc: "Hi my heroes! I just want you ready to our exams and focus on remaining assessments to gain more grades. good luck my warriors! 😊",
    img: userImage,
  },
  {
    name: "Mrs. Salma Ahmed",
    className: "Physics 02",
    desc: "Hello my students, I want to announce that the next quiz will be within 3 days and will cover the whole unit 2: Add and subtract number. Study hard Good luck :)",
    img: userImage,
  },
  {
    name: "School management",
    className: "Management",
    desc: "Goooooooooooood morning, Warriors! That get-ready-for-the-day call is heard each morning by 850 students at Goodwyn Junior High School. Have a great day!",
    img: userImage,
  },
  {
    name: "Events Manager",
    className: "Events",
    desc: "Hellooo, Can't wait our upcoming trip on the next weekend. The trip will be to Dreampark and Pyramids :D to book your seat please contact your class teacher.",
    img: userImage,
  },
];

export default function Announcement() {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const res = await getAnnouncements();
        setAnnouncements(res.data.announcements);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#fff",
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Stack spacing={0.5}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#505050",
              letterSpacing: "0.025rem",
            }}
          >
            Announcements
          </Typography>
          <Typography sx={{ color: "#a1a1a1", fontSize: "0.75rem" }}>
            We educate warriors! Keep updated :)
          </Typography>
        </Stack>

        <Button
          sx={{
            pt: 0,
            minWidth: "auto",
            textTransform: "none",
            color: "#60b8c3",
            fontWeight: 700,
            fontSize: "0.95rem",
            "&:hover": {
              bgcolor: "rgba(96, 184, 195, 0.08)",
            },
          }}
        >
          All
        </Button>
      </Stack>

      <Stack spacing={3.25}>
        
        {loading ? (
  <>
    <Skeleton variant="rounded" height={90} />
    <Skeleton variant="rounded" height={90} />
    <Skeleton variant="rounded" height={90} />
  </>
) :announcements.map((msg) => (
          <Message
            key={msg._id}
            name={msg.doctorName}
            className={msg.course}
            desc={msg.message}
            img={msg.avatar}
          />
        ))}
      </Stack>
    </Paper>
  );
}
