import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProjectView from "./pages/Project.view.tsx";
import SuscribeForm from "./pages/Subscribe.form.tsx";
import Layout from "./components/Layout.tsx";
import theme from "./theme.ts";
import { CookieProvider } from "./contexts/CookieContext.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "projects/:projectId",
      element: <ProjectView />,
    },
    {
      path: "projects/subscribe",
      element: <SuscribeForm />,
    },
  ],
  {
    basename: `${import.meta.env.BASE_URL}`,
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <CookieProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <RouterProvider router={router} />
          </Layout>
        </ChakraProvider>
      </CookieProvider>
    </QueryClientProvider>
  </StrictMode>
);
