import API from "./Axios";

export const createAnnouncement = async (data:any) => {
  const res = await API.post("/announcements", data);
  return res.data;
};

export const getAnnouncements = async () => {
  const res = await API.get("/announcements");
  return res.data;
};

export const getAnnouncementById = async (id:any) => {
  const res = await API.get(`/announcements/${id}`);
  return res.data;
};

export const updateAnnouncement = async (id:any, data:any) => {
  const res = await API.put(`/announcements/${id}`, data);
  return res.data;
};

export const deleteAnnouncement = async (id:any) => {
  const res = await API.delete(`/announcements/${id}`);
  return res.data;
};
