import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "";

export const getAllProjects = async () => {
  const { data } = await axios.get(`${apiUrl}/api/projects?populate=*`);
  return data?.data;
};

export const getOneProject = async (projectId: string | undefined) => {
  const { data } = await axios.get(
    `${apiUrl}/api/projects/${projectId}?populate=*`
  );
  return data?.data;
};
