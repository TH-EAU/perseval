import { useMutation } from "react-query";
import { createSubscriber } from "../services/Subscriber.service";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useCookieContext } from "../contexts/CookieContext";

export interface Subscriber {
  name: string;
  class: string;
  project: string;
}

export const useCreateSubscriber = () => {
  const toast = useToast();
  const navigation = useNavigate();
  const { cookieValue, updateCookie } = useCookieContext();

  if (cookieValue === "true") {
    toast({
      title: "Erreur lors de l'inscription",
      description: "Une seule inscription est authorisée par personne;",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }

  return useMutation({
    mutationFn: (data: Subscriber) => createSubscriber(data),
    onSuccess: () => {
      toast({
        title: "Inscription validée !",
        description: `Vous vous êtes inscrit au projet.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      updateCookie("true");
      navigation("/");
    },
    onError: (e: string) => {
      toast({
        title: "Erreur lors de l'inscription",
        description: `${e}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });
};
