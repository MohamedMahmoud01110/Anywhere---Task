import API from "./Axios";

export const createQuiz = async (data: any) => {
  const res = await API.post("/quizzes", data);
  return res.data;
};

export const getQuizzes = async () => {
  const res = await API.get("/quizzes");
  return res.data;
};

export const getQuizById = async (id: any) => {
  const res = await API.get(`/quizzes/${id}`);
  return res.data;
};

export const updateQuiz = async (id: any, data: any) => {
  const res = await API.put(`/quizzes/${id}`, data);
  return res.data;
};

export const deleteQuiz = async (id: any) => {
  const res = await API.delete(`/quizzes/${id}`);
  return res.data;
};
