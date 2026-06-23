import { Button, Paper, Stack, Typography, Skeleton } from "@mui/material";
import Message from "./Message";
import { useEffect, useState } from "react";
import { getAnnouncements } from "../api/AnnouncementApi";

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
        sx={{
          direction: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 0,
        }}
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
        ) : (
          announcements.map((msg) => (
            <Message
              key={msg._id}
              name={msg.doctorName}
              className={msg.course}
              desc={msg.message}
              img={msg.avatar}
            />
          ))
        )}
      </Stack>
    </Paper>
  );
}
