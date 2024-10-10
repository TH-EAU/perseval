import {
  Button,
  Box,
  Container,
  Heading,
  Image,
  Text,
  IconButton,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useProject } from "../dataHooks/project.queries";
import Slider from "react-slick";
import { Key, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useProjectSubscribers } from "../dataHooks/subscribers.queries";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ProjectView: React.FC = () => {
  const { projectId } = useParams();
  const { data } = useProject(projectId);
  const { data: subscribers } = useProjectSubscribers(projectId);
  const apiUrl = process.env.REACT_APP_API_URL || "";

  const remainingProjectPlaces = 7 - subscribers?.length;

  const [slider, setSlider] = useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  return (
    <Container>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {data && (
        <>
          <Heading mb={8}>{data.name.toLocaleUpperCase()}</Heading>

          <Box
            position={"relative"}
            height={"300px"}
            width={"full"}
            overflow={"hidden"}
            rounded="xl"
          >
            <IconButton
              aria-label="left-arrow"
              colorScheme="purple"
              borderRadius="full"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
            >
              <FaChevronLeft />
            </IconButton>
            <IconButton
              aria-label="right-arrow"
              colorScheme="purple"
              borderRadius="full"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
            >
              <FaChevronRight />
            </IconButton>

            <Slider {...settings} ref={(slider) => setSlider(slider)}>
              {data.medias.map((media: any, index: Key) => (
                <Box
                  key={index}
                  height={"300px"}
                  position="relative"
                  backgroundPosition="top"
                  backgroundRepeat="no-repeat"
                  backgroundSize="cover"
                  backgroundImage={`url(${apiUrl}/${media.url})`}
                />
              ))}
            </Slider>
          </Box>

          <Stack>
            <Box mb={5} mt={10}>
              <Text>{data.description}</Text>
            </Box>
            {remainingProjectPlaces > 0 && (
              <Button
                as="a"
                href={`subscribe?project=${projectId}&name=${data.name}`}
              >
                S'inscrire
              </Button>
            )}
            <Text
              color={`${remainingProjectPlaces > 0 ? "green" : "red"}.300`}
              mb={8}
            >
              {remainingProjectPlaces} place{remainingProjectPlaces > 1 && "s"}{" "}
              restantes
            </Text>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default ProjectView;
