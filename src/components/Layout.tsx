import { Container, HStack, Link } from "@chakra-ui/react";
import { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Container maxW={{ base: "sm", md: "2xl" }}>
      <HStack>
        <Link href="/" pt={5} pb={10}>
          Accueil
        </Link>
      </HStack>
      {children}
    </Container>
  );
};

export default Layout;
