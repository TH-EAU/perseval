import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useCreateSubscriber } from "../dataHooks/project.mutation";

import { useProjectSubscribers } from "../dataHooks/subscribers.queries";

type Inputs = {
  name: string;
  class: string;
  project: string;
};

const SubscribeForm: React.FC = () => {
  const [searchParams] = useSearchParams();

  const project = searchParams.get("project");
  const projectId: string | undefined = project ?? undefined;
  const { data: subscribers } = useProjectSubscribers(projectId);

  const { register, handleSubmit } = useForm<Inputs>();

  const { mutate } = useCreateSubscriber();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({ ...data, project: project || "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={5}>
          <FormControl isRequired>
            <FormLabel>Nom Prénom</FormLabel>
            <Input type="text" {...register("name")} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Classe</FormLabel>
            <Select {...register("class")}>
              <option value="1">classe1</option>
              <option value="2">classe2</option>
              <option value="3">classe3</option>
            </Select>
          </FormControl>
          {7 - subscribers?.length > 0 && (
            <Button type="submit">Valider</Button>
          )}
          <Text color={`${7 - subscribers?.length > 0 ? "green" : "red"}.300`}>
            {7 - subscribers?.length} place{7 - subscribers?.length > 1 && "s"}{" "}
            restantes
          </Text>
        </Stack>
      </form>
    </>
  );
};

export default SubscribeForm;
