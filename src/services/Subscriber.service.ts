import axios from "axios";
import { Subscriber } from "../dataHooks/project.mutation";

const apiUrl = process.env.REACT_APP_API_URL || "";

export const getSubscribersByProject = async (
  projectId: string | undefined
) => {
  const { data } = await axios.get(
    `${apiUrl}/api/subscribers?populate=*&filters[project][documentId]=${projectId}`
  );
  return data?.data;
};

export const verifySubscriberIP = async () => {
  const ip = await axios.get("https://api.ipify.org/?format=json");
  const userAddress = ip?.data.ip;
  const { data } = await axios.get(
    `${apiUrl}/api/subscribers?filters[IP]=${userAddress}`
  );

  if (data?.data.length === 0) {
    return userAddress;
  }

  return false;
};

export const createSubscriber = async (data: Subscriber): Promise<any> => {
  const address = await verifySubscriberIP();
  if (address) {
    const result = await axios.post(`${apiUrl}/api/subscribers`, {
      data: { ...data, IP: address },
    });
    return result.data;
  }

  throw new Error("Une seule inscription est autorisée par personne.");
};
