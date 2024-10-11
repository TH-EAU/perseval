import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useProjects } from "./dataHooks/project.queries";
import { useEffect } from "react";
import ProjectCard from "./components/ProjectCard";

function App() {
  const { data } = useProjects();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Heading mb={5}>Liste des projets</Heading>
      <SimpleGrid gap={2} columns={{ base: 2, md: 4 }}>
        {data?.map((project: any) => (
          <ProjectCard
            key={project.id}
            id={project.documentId}
            title={project.name}
            thumbnail={project.medias[0].url}
          />
        ))}
      </SimpleGrid>
    </>
  );
}

export default App;
