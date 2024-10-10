import { useQuery } from "react-query";
import { getAllProjects, getOneProject } from "../services/Project.services";

export const useProjects = () => {
  return useQuery("projects", getAllProjects);
};

export const useProject = (projectId: string | undefined) => {
  return useQuery(`project ${projectId}`, () => getOneProject(projectId));
};
