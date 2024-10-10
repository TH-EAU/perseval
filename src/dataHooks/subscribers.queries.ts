import { useQuery } from "react-query";
import { getSubscribersByProject } from "../services/Subscriber.service";

export const useProjectSubscribers = (projectId: string | undefined) => {
  return useQuery("projectSubs", () => getSubscribersByProject(projectId));
};
