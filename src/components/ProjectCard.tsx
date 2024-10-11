import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";

const ProjectCard: React.FC<{
  id: Number;
  title: String;
  thumbnail: String;
}> = ({ id, title, thumbnail }) => {
  const apiUrl = process.env.REACT_APP_API_URL || "";

  return (
    <Card
      as="a"
      href={`projects/${id}`}
      transition=".5s"
      overflow="hidden"
      _hover={{ filter: "brightness(120%)", transform: "scale(1.05)" }}
    >
      <CardHeader p={0}>
        <Image src={apiUrl + thumbnail} width="full" h={24} />
      </CardHeader>
      <CardBody>
        <Heading fontSize={14}>{title.toLocaleUpperCase()}</Heading>
        <Button
          fontSize={12}
          fontWeight="light"
          variant="link"
          rightIcon={<FaChevronRight />}
        >
          Voir le projet
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
