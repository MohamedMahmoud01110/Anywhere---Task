import { Grid, Stack } from "@mui/material";
import Announcement from "../components/Announcement";
import HeroSection from "../components/HeroSection";
import Tasks from "../components/Tasks";

export default function DashboardPage() {
  return (
    <Stack>
      <HeroSection />
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Announcement />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Tasks />
        </Grid>
      </Grid>
    </Stack>
  );
}
